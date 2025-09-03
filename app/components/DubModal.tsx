"use client";

import { useState, useRef } from 'react';
import { trackButtonClick } from './GoogleAnalytics';

// Language mapping
export const languageMap: { [key: string]: string } = {
    ara: 'Arabic',
    bul: 'Bulgarian',
    zho: 'Chinese',
    hrv: 'Croatian',
    ces: 'Czech',
    dan: 'Danish',
    nld: 'Dutch',
    eng: 'English',
    fil: 'Filipino',
    fin: 'Finnish',
    fra: 'French',
    deu: 'German',
    ell: 'Greek',
    hin: 'Hindi',
    ind: 'Indonesian',
    ita: 'Italian',
    jpn: 'Japanese',
    kor: 'Korean',
    msa: 'Malay',
    pol: 'Polish',
    por: 'Portuguese',
    ron: 'Romanian',
    rus: 'Russian',
    slk: 'Slovak',
    spa: 'Spanish',
    swe: 'Swedish',
    tam: 'Tamil',
    tur: 'Turkish',
    ukr: 'Ukrainian'
};


export const targetLanguageMap: { [key: string]: string } = {
    ara: 'Arabic',
    bul: 'Bulgarian',
    cmn: 'Chinese',
    hrv: 'Croatian',
    ces: 'Czech',
    dan: 'Danish',
    nld: 'Dutch',
    eng: 'English',
    fil: 'Filipino',
    fin: 'Finnish',
    fra: 'French',
    deu: 'German',
    ell: 'Greek',
    hin: 'Hindi',
    ind: 'Indonesian',
    ita: 'Italian',
    jpn: 'Japanese',
    kor: 'Korean',
    msa: 'Malay',
    pol: 'Polish',
    por: 'Portuguese',
    ron: 'Romanian',
    rus: 'Russian',
    slk: 'Slovak',
    spa: 'Spanish',
    swe: 'Swedish',
    tam: 'Tamil',
    tur: 'Turkish',
    ukr: 'Ukrainian'
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dubtitle.com/api';


interface DubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DubModal({ isOpen, onClose }: DubModalProps) {
  const [projectName, setProjectName] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('Select source language');
  const [targetLanguage, setTargetLanguage] = useState('Select target language');
  const [activeTab, setActiveTab] = useState<'upload' | 'youtube'>('upload');
//   const [createDubbingProject, setCreateDubbingProject] = useState(false);
  // const [numberOfSpeakers, setNumberOfSpeakers] = useState('Detect');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resourceId, setResourceId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to show alert
  const showAlertMessage = (type: 'success' | 'error', message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    
    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  // Generate languages array with placeholder first, then sorted language names
  const sourceLanguages = ['Select source language', ...Object.values(languageMap).sort()];
  const targetLanguages = ['Select target language', ...Object.values(targetLanguageMap).sort()];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
      handleUpload(files[0]); // Immediately upload the file
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      handleUpload(selectedFile); // Immediately upload the file
    }
  };

  const requestPresignedUrl = async (file: File) => {
    const response = await fetch(`${API_BASE_URL}/presigned-upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: file.name,
        content_type: file.type,
        source: 'dubtitle.com'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get presigned URL');
    }

    return response.json();
  };

  interface PresignedUploadData {
    presigned_url: string;
    content_type: string;
    resource_id: string;
    object_key: string;
  }

  const uploadToPresignedUrl = async (file: File, uploadData: PresignedUploadData) => {
    try {
      console.log('Starting direct upload to storage with presigned URL');
      console.log('Presigned URL:', uploadData.presigned_url.substring(0, 50) + '...');
      
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', uploadData.presigned_url);
      
      // Set Content-Type to match what was provided when getting the presigned URL
      xhr.setRequestHeader('Content-Type', uploadData.content_type);
      
      // Add a listener for progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          // Calculate progress as a percentage from 20% to 95%
          const fileProgress = event.loaded / event.total;
          const totalProgress = 20 + (fileProgress * 75); // Scale from 20% to 95%
          const percentComplete = Math.round(totalProgress);
          
          console.log(`Upload progress: ${percentComplete}%`);
          setUploadProgress(percentComplete);
        }
      };
      
      // Create a promise to handle the asynchronous XHR
      await new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Upload successful');
            setUploadProgress(100); // Set to 100% on success
            resolve(void 0);
          } else {
            console.error('Upload failed with status:', xhr.status);
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };
        
        xhr.onerror = () => {
          console.error('XHR error during upload');
          reject(new Error('Network error during upload'));
        };
        
        // Send the file directly as binary data
        xhr.send(file);
      });
      
      console.log('Upload completed successfully');
      
      // Return the resource ID and object key
      return { 
        resourceId: uploadData.resource_id, 
        objectKey: uploadData.object_key 
      };
    } catch (error) {
      console.error('Error during file upload:', error);
      throw error;
    }
  };

  const handleUpload = async (fileToUpload: File) => {
    setUploading(true);
    setUploadProgress(0);
    setResourceId(null);

    try {
      // 1. Get presigned URL
      console.log('Requesting presigned URL for file:', fileToUpload.name, fileToUpload.type);
      setUploadProgress(10); // 10% for starting the process
      
      const presignedUrlResponse = await requestPresignedUrl(fileToUpload);
      const uploadData = presignedUrlResponse.body
      console.log('Received presigned URL:', uploadData.presigned_url.substring(0, 50) + '...');
      
      // 2. Upload file directly to storage using presigned URL
      setUploadProgress(20); // 20% for getting presigned URL
      
      const uploadResult = await uploadToPresignedUrl(fileToUpload, uploadData);
      
      // Store the resource ID from the upload result
      setResourceId(uploadResult.resourceId);
      
      console.log('File uploaded successfully, resource ID:', uploadResult.resourceId);
      console.log('Object key:', uploadResult.objectKey);
      return true;
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
      setFile(null); // Reset file on error
      setResourceId(null);
      return false;
    } finally {
      setUploading(false);
    }
  };

  // Helper function to get language code from display name
  const getLanguageCode = (displayName: string, languageMap: { [key: string]: string }) => {
    return Object.keys(languageMap).find(code => languageMap[code] === displayName) || '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (submitting) return;
    
    // Validate that both source and target languages are selected
    if (sourceLanguage === 'Select source language') {
      alert('Please select a source language.');
      return;
    }
    
    if (targetLanguage === 'Select target language') {
      alert('Please select a target language.');
      return;
    }
    
    // Validate that source and target languages are different
    if (sourceLanguage === targetLanguage) {
      alert('Source and target languages must be different.');
      return;
    }
    
    // For upload tab, we need a resourceId (file should already be uploaded)
    if (activeTab === 'upload' && !resourceId) {
      alert('Please wait for the file to finish uploading.');
      return;
    }
    
    // For YouTube tab, we need a URL
    if (activeTab === 'youtube' && !youtubeUrl) {
      alert('Please enter a YouTube URL.');
      return;
    }

    // Convert display names back to language codes
    const sourceLanguageCode = getLanguageCode(sourceLanguage, languageMap);
    const targetLanguageCode = getLanguageCode(targetLanguage, targetLanguageMap);
    
    trackButtonClick('Create Dub', 'Dub Modal');
    
    setSubmitting(true);
    
    try {
      // Prepare payload for /api/translate
      const translatePayload = {
        resource_id: activeTab === 'upload' ? resourceId : null,
        source_language: sourceLanguageCode,
        target_language: targetLanguageCode,
        project_title: projectName || 'Untitled project',  // Use default if empty
        // Include additional fields for YouTube URL if needed
        ...(activeTab === 'youtube' && { youtube_url: youtubeUrl }),
        // ...(numberOfSpeakers !== 'Detect' && { number_of_speakers: parseInt(numberOfSpeakers) })
      };

      console.log('Calling /api/translate with payload:', translatePayload);
      
      // Call the translate API
      const response = await fetch(`${API_BASE_URL}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(translatePayload),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Translation API response:', result);
      
      // Close the modal first
      onClose();
      
      // Show success message
      showAlertMessage('success', 'Translation request submitted successfully!');
      
      // Refresh the page after a short delay to allow alert to show
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error calling translate API:', error);
      showAlertMessage('error', `Failed to submit translation request: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Dub your content</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Untitled project"
            />
          </div>

          {/* Language Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Source Language*
              </label>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {sourceLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Languages*
              </label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {targetLanguages.map(lang => (
                  <option key={lang} value={lang} disabled={lang === sourceLanguage}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Audio or Video Source */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Audio or video source*
            </label>
            
            {/* Tabs */}
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('upload');
                  setYoutubeUrl('');
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('youtube');
                  setFile(null);
                  setResourceId(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'youtube'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                YouTube
              </button>
            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div>
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-600 bg-gray-800/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {file ? (
                                          <div className="space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mx-auto">
                          {uploading ? (
                            <div className="relative">
                              <svg className="w-8 h-8 text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            </div>
                          ) : (
                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
                          {uploading && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          {!uploading && resourceId && (
                            <p className="text-green-400 text-sm mt-1">
                              ✓ Uploaded successfully
                            </p>
                          )}
                        </div>
                        {!uploading && (
                          <button
                            type="button"
                            onClick={() => {
                              setFile(null);
                              setResourceId(null);
                              setUploadProgress(0);
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
                            }}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove file
                          </button>
                        )}
                      </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mx-auto">
                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">Click or drag to upload here</p>
                        <p className="text-gray-400 text-sm">Audio or video file, up to 100MB or 5 minutes</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Browse Files
                      </button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept="video/*,audio/*"
                  className="hidden"
                />
              </div>
            )}

            {/* YouTube Tab */}
            {activeTab === 'youtube' && (
              <div>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Paste YouTube URL here"
                />
              </div>
            )}
          </div>

          {/* Additional Options */}
          {/* <div className="text-sm text-gray-400">
            <p>Your video will be dubbed in standard resolution and will include a watermark.</p>
            <p>Only Creator+ plans can change this. <span className="text-purple-400 underline cursor-pointer">Upgrade your plan</span></p>
          </div> */}

          {/* Create Dubbing Project Checkbox */}
          {/* <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="createDubbingProject"
              checked={createDubbingProject}
              onChange={(e) => setCreateDubbingProject(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="createDubbingProject" className="text-white">
              Create Dubbing project
            </label>
          </div> */}
          {/* <p className="text-sm text-gray-400">This will make your dub adjustable in our editor.</p> */}

          {/* Number of Speakers */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of speakers
            </label>
            <select
              value={numberOfSpeakers}
              onChange={(e) => setNumberOfSpeakers(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Detect">Detect</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div> */}

          {/* Time Range */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Time range to dub
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="hh:mm:ss"
              />
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="hh:mm:ss"
              />
            </div>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              uploading ||
              submitting ||
              (!resourceId && activeTab === 'upload') ||
              (!youtubeUrl && activeTab === 'youtube') ||
              sourceLanguage === 'Select source language' ||
              targetLanguage === 'Select target language' ||
              sourceLanguage === targetLanguage
            }
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              `Uploading... ${uploadProgress}%`
            ) : submitting ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{activeTab === 'youtube' ? 'Processing YouTube URL...' : 'Creating dub...'}</span>
              </div>
            ) : (
              'Create dub'
            )}
          </button>

          {/* Credits Info */}
          {/* <div className="text-center text-sm text-gray-400">
            Credits remaining before this dub: 25,484
          </div> */}
        </form>
        </div>
      </div>

      {/* Alert Component */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-[60] animate-in slide-in-from-top-2 duration-300">
          <div className={`px-6 py-4 rounded-xl shadow-lg border-l-4 max-w-sm ${
            alertType === 'success' 
              ? 'bg-green-900/90 border-green-400 text-green-100' 
              : 'bg-red-900/90 border-red-400 text-red-100'
          } backdrop-blur-lg`}>
            <div className="flex items-center space-x-3">
              {alertType === 'success' ? (
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p className="text-sm font-medium">{alertMessage}</p>
              <button
                onClick={() => setShowAlert(false)}
                className="text-gray-300 hover:text-white ml-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 