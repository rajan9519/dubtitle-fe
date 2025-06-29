"use client";

import { useState, useRef } from "react";

interface UploadResponse {
  uploadUrl: string;
  resourceId: string;
  fields?: Record<string, string>;
}

interface FileUploadProps {
  onUploadComplete?: (resourceId: string) => void;
  onUploadError?: (error: string) => void;
}

export default function FileUpload({ onUploadComplete, onUploadError }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isValidFileType = (file: File) => {
    const validTypes = [
      // Video types
      'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm', 'video/mkv',
      // Audio types
      'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac', 'audio/flac'
    ];
    
    const validExtensions = [
      // Video extensions
      '.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv',
      // Audio extensions
      '.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'
    ];
    
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    return validTypes.includes(file.type) || validExtensions.includes(fileExtension);
  };

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidFileType(droppedFile)) {
        setFile(droppedFile);
        setUploadStatus("idle");
        setErrorMessage("");
      } else {
        setErrorMessage("Please select a valid video or audio file");
        setUploadStatus("error");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (isValidFileType(selectedFile)) {
        setFile(selectedFile);
        setUploadStatus("idle");
        setErrorMessage("");
      } else {
        setErrorMessage("Please select a valid video or audio file");
        setUploadStatus("error");
      }
    }
  };

  const requestPresignedUrl = async (file: File): Promise<UploadResponse> => {
    const response = await fetch("https://api.subgen.in/upload/presigned-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get presigned URL: ${response.statusText}`);
    }

    return response.json();
  };

  const uploadToPresignedUrl = async (file: File, uploadData: UploadResponse) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploadProgress(Math.round(percentComplete));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      // Prepare form data for S3 upload
      const formData = new FormData();
      
      // Add S3 fields if they exist (for S3 POST uploads)
      if (uploadData.fields) {
        Object.entries(uploadData.fields).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }
      
      // Add the file (must be last for S3)
      formData.append('file', file);

      // Start upload
      xhr.open('POST', uploadData.uploadUrl);
      xhr.send(formData);
    });
  };

  const notifyUploadComplete = async (resourceId: string) => {
    const response = await fetch("https://api.subgen.in/upload/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resourceId: resourceId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to notify upload completion: ${response.statusText}`);
    }

    return response.json();
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus("uploading");
    setUploadProgress(0);
    setErrorMessage("");

    try {
      // Step 1: Request presigned URL
      const uploadData = await requestPresignedUrl(file);

      // Step 2: Upload file to presigned URL
      await uploadToPresignedUrl(file, uploadData);

      // Step 3: Notify backend of completion
      await notifyUploadComplete(uploadData.resourceId);

      setUploadStatus("success");
      setUploadProgress(100);
      
      if (onUploadComplete) {
        onUploadComplete(uploadData.resourceId);
      }
    } catch (error) {
      console.error("Upload error:", error);
      const errorMsg = error instanceof Error ? error.message : "Upload failed";
      setErrorMessage(errorMsg);
      setUploadStatus("error");
      
      if (onUploadError) {
        onUploadError(errorMsg);
      }
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Upload Your Media File
        </h2>

        {!file ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              dragActive
                ? "border-purple-400 bg-purple-500/10 scale-105"
                : "border-white/20 hover:border-purple-400/50 hover:bg-white/5"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
            </div>
            
            <p className="text-xl mb-4 text-white font-medium">
              Drag and drop your file here
            </p>
            
            <p className="text-gray-400 mb-6">or</p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Browse Files
            </button>
            
            <div className="mt-8 p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-gray-300 font-medium mb-2">Supported Formats:</p>
              <p className="text-xs text-gray-400">
                <span className="font-medium text-purple-300">Video:</span> MP4, AVI, MOV, WMV, FLV, WebM, MKV<br />
                <span className="font-medium text-pink-300">Audio:</span> MP3, WAV, OGG, M4A, AAC, FLAC
              </p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept="video/*,audio/*,.mp4,.avi,.mov,.wmv,.flv,.webm,.mkv,.mp3,.wav,.ogg,.m4a,.aac,.flac"
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info */}
            <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white text-lg">{file.name}</p>
                  <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
              
              {uploadStatus === "idle" && (
                <button
                  onClick={resetUpload}
                  className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:bg-white/5 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Upload Progress */}
            {uploadStatus === "uploading" && (
              <div className="space-y-4">
                <div className="flex justify-between text-white">
                  <span className="font-medium">Uploading...</span>
                  <span className="font-bold text-purple-300">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 shadow-lg"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-300 text-center">Please don't close this page</p>
              </div>
            )}

            {/* Success Message */}
            {uploadStatus === "success" && (
              <div className="flex items-center justify-center space-x-3 p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-green-300 font-medium text-lg">Upload completed successfully!</span>
              </div>
            )}

            {/* Error Message */}
            {uploadStatus === "error" && (
              <div className="flex items-center justify-center space-x-3 p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-red-300 font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Upload Button */}
            {uploadStatus === "idle" && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Upload
              </button>
            )}

            {/* Reset Button */}
            {(uploadStatus === "success" || uploadStatus === "error") && (
              <button
                onClick={resetUpload}
                className="w-full py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Upload Another File
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 