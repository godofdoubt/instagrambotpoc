// frontend/components/InstagramContentCreator.tsx

import React, { useState, useRef } from 'react';
import { 
  Camera, Hash, Wand2, Copy, Share, Calendar, Image, Type,
  Sparkles, RefreshCw, Save, Eye, Upload, X, Settings, Target,
  Clock, Users, TrendingUp, Palette, Zap, Heart, MessageCircle,
  Send, Bookmark, Play, Music, Filter, Crop, BarChart2, BookOpen
} from 'lucide-react';

const InstagramContentCreator = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [contentType, setContentType] = useState('feed');
  const [inputText, setInputText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedImagePrompt, setGeneratedImagePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState('casual');
  const [audience, setAudience] = useState('general');
  const [contentGoal, setContentGoal] = useState('engagement');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [savedContent, setSavedContent] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState('now');
  
  const fileInputRef = useRef(null);

  // --- YENİ API ÇAĞRI FONKSİYONU ---
  const handleApiGeneration = async () => {
    if (!inputText.trim()) {
      alert("Lütfen içerik fikrinizi yazın.");
      return;
    }
    
    setIsGenerating(true);
    setGeneratedContent('');
    setGeneratedImagePrompt('');

    // Backend URL'sini .env.local dosyasından alır, yoksa localhost:8000 kullanır
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

    try {
      const response = await fetch(`${apiBaseUrl}/api/generate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          inputText,
          tone,
          audience,
          contentGoal,
          includeEmojis,
          includeCTA,
        }),
      });

      if (!response.ok) {
        // HTTP 500 veya 400 gibi bir hata varsa
        const errorData = await response.json();
        throw new Error(errorData.error || 'API isteği başarısız oldu.');
      }

      const data = await response.json();
      
      setGeneratedContent(data.generatedContent);
      setGeneratedImagePrompt(data.generatedImagePrompt);

    } catch (error) {
      console.error("API Hatası:", error);
      setGeneratedContent(`Bir hata oluştu: ${error.message}. Lütfen backend sunucunuzun çalıştığından ve .env dosyanızın doğru olduğundan emin olun.`);
    } finally {
      setIsGenerating(false);
    }
  };


  const contentTypes = [
    { id: 'feed', name: 'Feed Post', icon: Image, desc: 'Regular Instagram post' },
    { id: 'story', name: 'Story', icon: Camera, desc: '24-hour story content' },
    { id: 'reel', name: 'Reel', icon: Play, desc: 'Short video content' },
    { id: 'carousel', name: 'Carousel', icon: Type, desc: 'Multi-slide post' }
  ];

  const tones = [
    { id: 'casual', name: 'Casual & Friendly', emoji: '😊' },
    { id: 'professional', name: 'Professional', emoji: '💼' },
    { id: 'funny', name: 'Fun & Humorous', emoji: '😄' },
    { id: 'inspirational', name: 'Inspirational', emoji: '✨' },
    { id: 'educational', name: 'Educational', emoji: '🎓' },
    { id: 'trendy', name: 'Trendy & Hip', emoji: '🔥' },
    { id: 'luxury', name: 'Premium & Luxury', emoji: '💎' },
    { id: 'minimalist', name: 'Clean & Minimal', emoji: '🤍' }
  ];

  const audiences = [
    { id: 'general', name: 'General Audience', desc: 'Broad appeal' },
    { id: 'millennials', name: 'Millennials (25-40)', desc: 'Career-focused' },
    { id: 'genz', name: 'Gen Z (18-24)', desc: 'Digital natives' },
    { id: 'professionals', name: 'Business Professionals', desc: 'B2B audience' },
    { id: 'entrepreneurs', name: 'Entrepreneurs', desc: 'Startup community' },
    { id: 'creatives', name: 'Creatives & Artists', desc: 'Design community' },
    { id: 'fitness', name: 'Health & Fitness', desc: 'Wellness enthusiasts' },
    { id: 'parents', name: 'Parents & Families', desc: 'Family-oriented' }
  ];

  const contentGoals = [
    { id: 'engagement', name: 'Drive Engagement', icon: Heart },
    { id: 'awareness', name: 'Brand Awareness', icon: Eye },
    { id: 'traffic', name: 'Drive Traffic', icon: TrendingUp },
    { id: 'sales', name: 'Generate Sales', icon: Target },
  ];

  const scheduleOptions = [
    { id: 'now', name: 'Post Now', time: 'Immediate' },
    { id: 'peak', name: 'Peak Hours', time: 'e.g., 6-9 PM today' },
    { id: 'custom', name: 'Custom Time', time: 'Choose specific time' }
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          file,
          url: e.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const saveContent = () => {
    if (generatedContent) {
      const newContent = {
        id: Date.now(),
        type: contentType,
        content: generatedContent,
        imagePrompt: generatedImagePrompt,
        createdAt: new Date().toLocaleDateString(),
      };
      setSavedContent([newContent, ...savedContent]);
    }
  };

  const deleteContent = (id) => {
    setSavedContent(prev => prev.filter(content => content.id !== id));
  };
  
  const StatCard = ({ icon, label, value }) => {
    const Icon = icon;
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-xl">
            <Icon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Instagram Creator Pro
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">AI-powered content & visual creation</p>
              </div>
            </div>
            <div className="flex space-x-1 sm:space-x-2">
              <button 
                onClick={() => setActiveTab('create')}
                className={`px-3 sm:px-6 py-2 rounded-xl font-medium transition-all text-sm sm:text-base ${
                  activeTab === 'create' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Create
              </button>
              <button 
                onClick={() => setActiveTab('saved')}
                className={`px-3 sm:px-6 py-2 rounded-xl font-medium transition-all text-sm sm:text-base ${
                  activeTab === 'saved' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Library ({savedContent.length})
              </button>
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`px-3 sm:px-6 py-2 rounded-xl font-medium transition-all text-sm sm:text-base ${
                  activeTab === 'analytics' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'create' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Settings Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Content Type Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Content Type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {contentTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setContentType(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          contentType === type.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-6 h-6 mb-2 text-purple-500" />
                        <div className="font-medium text-sm">{type.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tone & Voice</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {tones.map((t) => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {audiences.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Goal</label>
                  <div className="grid grid-cols-2 gap-2">
                    {contentGoals.map((goal) => {
                      const Icon = goal.icon;
                      return (
                        <button
                          key={goal.id}
                          onClick={() => setContentGoal(goal.id)}
                          className={`p-3 rounded-lg border text-left transition-all flex items-center space-x-2 ${
                            contentGoal === goal.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <div className="text-xs font-medium">{goal.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" checked={includeEmojis} onChange={(e) => setIncludeEmojis(e.target.checked)} className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"/>
                    <span className="ml-2 text-sm">Include emojis</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" checked={includeCTA} onChange={(e) => setIncludeCTA(e.target.checked)} className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"/>
                    <span className="ml-2 text-sm">Include call-to-action</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Content Creation Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Input Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><Type className="w-5 h-5 mr-2" />Content Brief</h3>
                <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Describe your content idea. e.g., 'A post about my morning routine that helps with productivity'" className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none"/>
                
                {/* --- DEĞİŞİKLİK BURADA: onClick={handleApiGeneration} --- */}
                <button onClick={handleApiGeneration} disabled={isGenerating || !inputText.trim()} className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                  {isGenerating ? (<><RefreshCw className="w-5 h-5 animate-spin" /><span>Creating...</span></>) : (<><Wand2 className="w-5 h-5" /><span>Generate Content</span></>)}
                </button>
              </div>

              {/* Visuals Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><Image className="w-5 h-5 mr-2" />Visuals</h3>
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload images</p>
                </div>
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden"/>

                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {uploadedImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img src={img.url} alt={img.name} className="w-full h-20 object-cover rounded-lg"/>
                        <button onClick={() => removeImage(img.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="text-center text-gray-400 my-4 text-sm">or</p>
                
                 {/* --- DEĞİŞİKLİK BURADA: Bu buton da artık ana fonksiyonu tetikleyebilir veya kaldırılabilir. --- */}
                 {/* Not: Backend artık metin ve görsel prompt'u aynı anda üretiyor, bu yüzden tek bir buton yeterli. */}
                <button onClick={handleApiGeneration} disabled={isGenerating || !inputText.trim()} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 flex items-center justify-center space-x-2">
                  {isGenerating ? (<><RefreshCw className="w-4 h-4 animate-spin" /><span>Generating...</span></>) : (<><Palette className="w-4 h-4" /><span>Generate Content & Prompt</span></>)}
                </button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Generated Content */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Output</h3>
                  {generatedContent && (
                    <div className="flex space-x-2">
                      <button onClick={() => navigator.clipboard.writeText(generatedContent)} className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Copy content"><Copy className="w-4 h-4" /></button>
                      <button onClick={saveContent} className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Save to Library"><Save className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>

                    {/* --- CORRECTED SECTION STARTS HERE --- */}
                    {/* This container now handles the scrolling, allowing content inside to stack correctly. */}
                    <div className="flex-grow space-y-4 overflow-y-auto min-h-0">
                        {/* The main content area */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                                {isGenerating ? 'AI is thinking...' : (generatedContent || 'Your generated content will appear here...')}
                            </pre>
                        </div>
                        {/* The AI image prompt, which now appears correctly below the content */}
                        {generatedImagePrompt && !isGenerating && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2 text-gray-800 flex items-center"><Palette className="w-4 h-4 mr-2" />AI Image Prompt</h4>
                                <p className="text-sm text-gray-600">{generatedImagePrompt}</p>
                                <button onClick={() => navigator.clipboard.writeText(generatedImagePrompt)} className="mt-2 text-xs font-medium text-purple-600 hover:underline">Copy Prompt</button>
                            </div>
                        )}
                    </div>
                    {/* --- CORRECTED SECTION ENDS HERE --- */}  
                
                <div className="mt-6">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">Publishing</h4>
                  <select value={selectedSchedule} onChange={(e) => setSelectedSchedule(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3">
                    {scheduleOptions.map((opt) => <option key={opt.id} value={opt.id}>{opt.name} ({opt.time})</option>)}
                  </select>
                  <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center space-x-2">
                    <Send className="w-5 h-5"/>
                    <span>{selectedSchedule === 'now' ? 'Post to Instagram' : 'Schedule Post'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved ve Analytics tabları aynı kalabilir */}
        {activeTab === 'saved' && (
          // ... (Bu kısım değişmedi)
           <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="w-7 h-7 mr-3" />
              Content Library
            </h2>
            {savedContent.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border shadow-sm">
                <p className="text-gray-500">Your saved content will appear here.</p>
                <button onClick={() => setActiveTab('create')} className="mt-4 px-5 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600">Create New Content</button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedContent.map(item => (
                  <div key={item.id} className="bg-white p-5 rounded-2xl border shadow-sm flex items-start justify-between">
                    <div>
                      <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full mb-2 capitalize">{item.type}</span>
                      <p className="text-gray-600 text-sm line-clamp-2">{item.content}</p>
                      <p className="text-xs text-gray-400 mt-2">Saved on: {item.createdAt}</p>
                    </div>
                    <div className="flex space-x-2 flex-shrink-0 ml-4">
                       <button onClick={() => navigator.clipboard.writeText(item.content)} className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Copy content"><Copy className="w-4 h-4" /></button>
                       <button onClick={() => deleteContent(item.id)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'analytics' && (
           // ... (Bu kısım değişmedi)
           <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart2 className="w-7 h-7 mr-3" />
                Performance Analytics
            </h2>
            <div className="text-center py-12 bg-white rounded-2xl border shadow-sm mb-8">
              <h3 className="text-xl font-semibold text-gray-700">Analytics Dashboard</h3>
              <p className="text-gray-500 mt-1">This is a preview of what your analytics could look like.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Heart} label="Total Engagement" value="12,483" />
                <StatCard icon={Eye} label="Impressions (30d)" value="256.1K" />
                <StatCard icon={TrendingUp} label="Follower Growth" value="+5.2%" />
                <StatCard icon={Target} label="Link Clicks" value="1,829" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InstagramContentCreator;