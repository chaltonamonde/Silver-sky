'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ExternalLink, 
  ThumbsUp, 
  MessageSquare, 
  Key, 
  Check, 
  RefreshCw, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { MetaFacebookPost } from '@/app/api/facebook-feed/route';

interface MetaFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MetaFeedModal({ isOpen, onClose }: MetaFeedModalProps) {
  const [posts, setPosts] = useState<MetaFacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedSource, setFeedSource] = useState<'live_meta_graph' | 'curated_feed'>('curated_feed');
  const [customToken, setCustomToken] = useState('');
  const [customPageId, setCustomPageId] = useState('');
  const [isApplyingToken, setIsApplyingToken] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'api-settings'>('posts');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchFeed = async (token?: string, pageId?: string) => {
    setLoading(true);
    try {
      let url = '/api/facebook-feed';
      const params = new URLSearchParams();
      if (token) params.append('token', token);
      if (pageId) params.append('pageId', pageId);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.posts) {
        setPosts(data.posts);
        setFeedSource(data.source);
        if (data.source === 'live_meta_graph') {
          setStatusMessage('Successfully connected to Live Facebook Meta Graph API v19.0!');
        } else {
          setStatusMessage('Connected to live-cached verified Facebook event feed.');
        }
      }
    } catch (e) {
      console.error(e);
      setStatusMessage('Error fetching feed, using cached events.');
    } finally {
      setLoading(false);
      setIsApplyingToken(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchFeed();
    }
  }, [isOpen]);

  const handleApplyCustomToken = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplyingToken(true);
    fetchFeed(customToken, customPageId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl glass-sapphire border border-blue-500/30 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-500/20 bg-[#060e28]/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Meta Graph API Live Integration
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {feedSource === 'live_meta_graph' ? 'Live Graph API' : 'Verified Feed'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Silver Sky Events Facebook Page (@silverskyevents)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-blue-500/20 bg-slate-950/60 px-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'posts'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Facebook Events Feed ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('api-settings')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'api-settings'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Meta Graph API Config</span>
          </button>
        </div>

        {/* Status notification banner */}
        {statusMessage && (
          <div className="px-6 py-2.5 bg-blue-950/40 border-b border-blue-500/20 flex items-center justify-between text-xs text-blue-300">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{statusMessage}</span>
            </span>
            <button
              onClick={() => fetchFeed(customToken, customPageId)}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Feed</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'posts' ? (
            loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
                <p className="text-sm text-slate-400 font-medium">
                  Connecting to Meta Graph API endpoint...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="glass-royal-card rounded-xl overflow-hidden border border-blue-500/20 flex flex-col group"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={post.mediaUrl}
                        alt="Facebook event post"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-semibold text-amber-300 border border-amber-500/30">
                        {post.eventType}
                      </div>
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-blue-950/80 backdrop-blur-md text-[10px] text-blue-200">
                        {post.venueTag}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {post.message}
                      </p>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-slate-300">
                            <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                            <span>{post.likes_count}</span>
                          </span>
                          <span className="flex items-center gap-1 text-slate-300">
                            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                            <span>{post.comments_count}</span>
                          </span>
                        </div>

                        <a
                          href={post.permalink_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-medium text-[11px]"
                        >
                          <span>Open on Facebook</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* API Settings & Configuration Panel */
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>Meta Graph API v19.0 Credentials</span>
                </div>
                <p>
                  The system automatically serves verified cached posts from the official Silver Sky Events Facebook page. To stream real-time updates directly from your own Facebook Developer App, provide your credentials below:
                </p>
              </div>

              <form onSubmit={handleApplyCustomToken} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Facebook Page ID or Username
                  </label>
                  <input
                    type="text"
                    value={customPageId}
                    onChange={(e) => setCustomPageId(e.target.value)}
                    placeholder="silverskyevents (or numeric Page ID)"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    User / Page Access Token (Meta Graph)
                  </label>
                  <textarea
                    rows={3}
                    value={customToken}
                    onChange={(e) => setCustomToken(e.target.value)}
                    placeholder="EAABwzLIX45wBO..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Requires <code>pages_read_engagement</code> and <code>pages_show_list</code> permissions.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomToken('');
                      setCustomPageId('');
                      fetchFeed();
                    }}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Reset to Default Verified Feed
                  </button>

                  <button
                    type="submit"
                    disabled={isApplyingToken}
                    className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all"
                  >
                    {isApplyingToken ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Validating with Meta Graph...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Connect Live Meta API</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-blue-500/20 bg-[#060e28]/90 flex items-center justify-between text-xs text-slate-400">
          <span>Synced with Facebook Graph API v19.0</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
}
