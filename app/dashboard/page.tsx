'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, User } from '../../lib/auth';
import DubModal from '../components/DubModal';

interface Transaction {
  id: string;
  type: 'credit_purchase' | 'credit_usage' | 'plan_upgrade' | 'plan_downgrade';
  amount: number;
  credits_seconds: number;
  description: string;
  created_at: string;
  status: 'pending' | 'completed' | 'failed';
}

interface DubbingTask {
  id: string;
  user_id: string;
  resource_id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  transcript_id: number;
  source_language: string;
  target_language: string;
  provider: string;
  output_video_path: string | null;
  output_audio_path: string | null;
  output_video_url: string | null;
  project_title: string;
  created_at: string;
  updated_at: string;
}

interface UserUsage {
  user_id: string;
  email: string;
  credits: {
    available_credits_seconds: number;
    credits_used_seconds: number;
    credits_limit_seconds: number;
    billing_period_end: string;
  };
  plan: {
    name: string;
    monthly_credits_seconds: number;
    max_video_duration_seconds: number;
  };
  usage_statistics: {
    videos_processed_this_cycle: number;
    duration_processed_this_cycle_seconds: number;
    days_remaining_in_cycle: number;
  };
  current_period_transactions: Transaction[];
  recent_transactions: Transaction[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dubtitle.com/api';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<DubbingTask[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [usage, setUsage] = useState<UserUsage | null>(null);
  const [usageLoading, setUsageLoading] = useState(true);
  const [usageError, setUsageError] = useState<string | null>(null);
  const [showDubModal, setShowDubModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUser();
        if (!currentUser) {
          throw new Error('User not authenticated');
        }
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setError(error instanceof Error ? error.message : 'Failed to authenticate user');
        // Redirect to login if authentication fails
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dubbing-tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();
      setTasks(responseJson.body?.tasks || []);
      setTasksError(null);
    } catch (error) {
      console.error('Failed to fetch dubbing tasks:', error);
      setTasksError(error instanceof Error ? error.message : 'Failed to fetch dubbing tasks');
      setTasks([]);
    } finally {
      setTasksLoading(false);
    }
  };

  const fetchUsage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/usage`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();
      setUsage(responseJson.body);
      setUsageError(null);
    } catch (error) {
      console.error('Failed to fetch usage:', error);
      setUsageError(error instanceof Error ? error.message : 'Failed to fetch usage');
      // Fallback to example data when API fails
      setUsage({
        user_id: "example_user",
        email: "user@example.com",
        credits: {
          available_credits_seconds: 180,
          credits_used_seconds: 120,
          credits_limit_seconds: 300,
          billing_period_end: "2024-02-14T10:30:00.000Z"
        },
        plan: {
          name: "free",
          monthly_credits_seconds: 300,
          max_video_duration_seconds: 30
        },
        usage_statistics: {
          videos_processed_this_cycle: 4,
          duration_processed_this_cycle_seconds: 120,
          days_remaining_in_cycle: 25
        },
        current_period_transactions: [],
        recent_transactions: []
      });
    } finally {
      setUsageLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch tasks and usage if user is loaded
    if (user) {
      fetchTasks();
      fetchUsage();
    }
  }, [user]);

  // Set up periodic updates every 5 seconds
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      fetchTasks();
      // fetchUsage();
    }, 5000); // 5 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [user]);

  const handleSignOut = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Redirect to login page after successful logout
      router.push('/');
    } catch (error) {
      console.error('Failed to sign out:', error);
      // Still redirect to login even if logout fails
      router.push('/');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'failed':
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'processing':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        );
      default: // queued
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'processing':
        return 'Processing';
      default:
        return 'Queued';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'processing':
        return 'text-blue-600';
      default:
        return 'text-yellow-600';
    }
  };

  const handleDownloadVideo = async (task: DubbingTask) => {
    if (!task.output_video_url) {
      console.error('No output video URL available');
      return;
    }

    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = task.output_video_url;
      link.download = `${task.project_title || 'dubbed-video'}.mp4`;
      link.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download video:', error);
      // Optionally show an error message to the user
    }
  };

  const formatCredits = (usage: UserUsage) => {
    const availableMinutes = Math.floor(usage.credits.available_credits_seconds / 60);
    const totalMinutes = Math.floor(usage.credits.credits_limit_seconds / 60);
    const availableSeconds = usage.credits.available_credits_seconds % 60;
    const totalSeconds = usage.credits.credits_limit_seconds % 60;
    
    if (availableMinutes > 0) {
      return `${availableMinutes}m ${availableSeconds}s remaining of ${totalMinutes}m ${totalSeconds}s`;
    }
    return `${availableSeconds}s remaining of ${totalMinutes}m ${totalSeconds}s`;
  };

  const getCreditsPercentage = (usage: UserUsage) => {
    if (usage.credits.credits_limit_seconds === 0) return 0;
    return (usage.credits.available_credits_seconds / usage.credits.credits_limit_seconds) * 100;
  };

  const formatPlanName = (planName: string) => {
    return planName.charAt(0).toUpperCase() + planName.slice(1);
  };

  // Show loading state while fetching user
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="text-gray-700 text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state if user fetch failed
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-gray-900 text-xl font-semibold mb-2">Authentication Error</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  // Don't render if user is not loaded
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="relative z-20 border-b border-gray-200 bg-white">
        <div className="container mx-auto p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-black rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-900 text-xl lg:text-2xl font-bold">DubTitle</span>
            </div>
          
            {/* User Info and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              {/* Welcome Message */}
              <div className="text-gray-700 text-sm lg:text-base order-3 sm:order-1">
                <span className="hidden sm:inline">Welcome, </span>
                <span className="font-medium text-gray-900">{user.email}</span>
              </div>
              
              {/* Credits Display */}
              <div className="flex items-center space-x-2 lg:space-x-3 bg-gray-50 border border-gray-200 rounded-lg px-3 lg:px-4 py-2 order-1 sm:order-2 w-full sm:w-auto">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <div className="text-gray-900 flex-1 min-w-0">
                    {usageLoading ? (
                      <span className="text-xs lg:text-sm">Loading...</span>
                    ) : usageError ? (
                      <span className="text-xs lg:text-sm text-red-500">Usage unavailable</span>
                    ) : usage ? (
                      <div className="flex flex-col">
                        <span className="text-xs lg:text-sm font-medium truncate">{formatCredits(usage)}</span>
                        <div className="flex items-center justify-between text-xs text-gray-600 mt-0.5">
                          <span>{formatPlanName(usage.plan.name)} plan</span>
                          <span className="hidden sm:inline">{usage.usage_statistics.days_remaining_in_cycle} days left</span>
                        </div>
                        <div className="w-24 sm:w-28 lg:w-32 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              getCreditsPercentage(usage) > 50 
                                ? 'bg-green-500' 
                                : getCreditsPercentage(usage) > 20
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${getCreditsPercentage(usage)}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs lg:text-sm">No usage data</span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="px-3 lg:px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-colors text-sm lg:text-base order-2 sm:order-3"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8 space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">My Dubbing Projects</h1>
              <p className="text-gray-600 text-sm lg:text-base">Manage and track your dubbing tasks</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4">
              <button
                onClick={() => router.push('/pricing')}
                className="px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm lg:text-base"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Upgrade Plan</span>
              </button>
              <button
                onClick={() => setShowDubModal(true)}
                className="px-4 sm:px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm lg:text-base"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Project</span>
              </button>
            </div>
          </div>

          {/* Tasks Content */}
          <div className="bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-sm">
            {tasksLoading ? (
              <div className="flex items-center justify-center py-8 lg:py-12">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-gray-700 text-base lg:text-lg">Loading dubbing tasks...</span>
                </div>
              </div>
            ) : tasksError ? (
              // Error state - show error message but still allow creating new projects
              <div className="text-center py-8 lg:py-12">
                <div className="w-16 h-16 lg:w-24 lg:h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <svg className="w-8 h-8 lg:w-12 lg:h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">
                  Failed to load dubbing tasks
                </h2>
                <p className="text-gray-600 mb-6 lg:mb-8 max-w-md mx-auto text-sm lg:text-base px-4 lg:px-0">
                  There was an error loading your dubbing tasks. You can still create new projects while we work on fixing this issue.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => fetchTasks()}
                    className="px-6 lg:px-8 py-3 lg:py-4 bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 inline-flex items-center space-x-2 text-sm lg:text-base"
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Retry</span>
                  </button>
                  <button
                    onClick={() => setShowDubModal(true)}
                    className="px-6 lg:px-8 py-3 lg:py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 inline-flex items-center space-x-2 text-sm lg:text-base"
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create New Project</span>
                  </button>
                </div>
              </div>
            ) : tasks.length === 0 ? (
              // Empty state
              <div className="text-center py-8 lg:py-12">
                <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <svg className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">
                  No dubbing tasks yet
                </h2>
                <p className="text-gray-600 mb-6 lg:mb-8 max-w-md mx-auto text-sm lg:text-base px-4 lg:px-0">
                  Start your dubbing journey by creating your first project. Upload a video or paste a YouTube URL to get started.
                </p>
                <button
                  onClick={() => setShowDubModal(true)}
                  className="px-6 lg:px-8 py-3 lg:py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 inline-flex items-center space-x-2 text-sm lg:text-base"
                >
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create Your First Project</span>
                </button>
              </div>
            ) : (
              // Tasks list
              <div className="space-y-3 lg:space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-gray-50 border border-gray-200 rounded-lg lg:rounded-xl p-4 lg:p-6 hover:bg-gray-100 hover:shadow-md transition-all duration-300 hover:border-gray-300">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
                      {/* Main Content */}
                      <div className="flex items-start space-x-3 lg:space-x-4 flex-1 min-w-0">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(task.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 truncate pr-2">{task.project_title || 'Untitled Project'}</h3>
                            {/* Mobile status */}
                            <div className={`lg:hidden text-xs font-medium ${getStatusColor(task.status)} flex items-center space-x-1 flex-shrink-0`}>
                              <span>{getStatusText(task.status)}</span>
                            </div>
                          </div>
                          
                          {/* Task Details */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs lg:text-sm text-gray-600 mb-3">
                            <span className="flex items-center space-x-1 mb-1 sm:mb-0">
                              <svg className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                              </svg>
                              <span>{task.source_language} → {task.target_language}</span>
                            </span>
                            <span className="hidden sm:block text-gray-400">•</span>
                            <span className="flex items-center space-x-1">
                              <svg className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{formatDate(task.created_at)}</span>
                            </span>
                          </div>

                          {/* Mobile Progress Bar */}
                          {task.status === 'processing' && (
                            <div className="lg:hidden flex items-center space-x-3 mb-3">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 min-w-[3rem] text-right">{task.progress}%</span>
                            </div>
                          )}

                          {/* Mobile Download Button */}
                          {task.status === 'completed' && task.output_video_url && (
                            <button 
                              onClick={() => handleDownloadVideo(task)}
                              className="lg:hidden w-full sm:w-auto px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Download Video</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Desktop Actions */}
                      <div className="hidden lg:flex flex-col items-end space-y-3 flex-shrink-0">
                        <div className={`text-sm font-medium ${getStatusColor(task.status)} flex items-center space-x-2`}>
                          <span>{getStatusText(task.status)}</span>
                        </div>
                        {task.status === 'processing' && (
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 min-w-[3rem] text-right">{task.progress}%</span>
                          </div>
                        )}
                        {task.status === 'completed' && task.output_video_url && (
                          <button 
                            onClick={() => handleDownloadVideo(task)}
                            className="px-6 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center space-x-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Download Video</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dub Modal */}
      <DubModal
        isOpen={showDubModal}
        onClose={() => setShowDubModal(false)}
      />
    </div>
  );
} 