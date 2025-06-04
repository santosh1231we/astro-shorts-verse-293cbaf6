
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Menu, 
  Search, 
  Upload, 
  Bell, 
  User, 
  Home,
  Video,
  MoreHorizontal
} from "lucide-react";
import { useFirebaseData } from "@/hooks/useFirebaseData";

interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  uploadTime: string;
  thumbnail: string;
  channelAvatar: string;
  duration: string;
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const { videos, loading, hasMore, loadMoreVideos } = useFirebaseData();

  const categories = [
    "All", "Space", "Science", "NASA", "Astronomy", "Physics", "Documentaries", "Education", "Technology"
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = videos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered);
      console.log('Search results:', filtered.length);
    } else {
      setFilteredVideos([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Infinite scroll
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    if (hasMore) {
      loadMoreVideos();
    }
  }, [hasMore, loading, loadMoreVideos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const videosToShow = filteredVideos.length > 0 ? filteredVideos : videos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-900/30">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-900/20">
              <Menu size={20} />
            </Button>
            <Link to="/" className="flex items-center gap-1">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded flex items-center justify-center">
                <Video size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">AstroTube</span>
            </Link>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>
              <Button 
                variant="outline" 
                className="rounded-l-none px-6 bg-gray-800 border-gray-700 text-white hover:bg-red-900/20"
                onClick={handleSearch}
              >
                <Search size={18} />
              </Button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-900/20">
              <Upload size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-900/20">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-red-900/20">
              <User size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 hidden lg:block border-r border-red-900/30 min-h-screen bg-black/30">
          <nav className="p-3">
            <div className="space-y-1">
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start gap-6 bg-red-900/30 text-white hover:bg-red-900/40">
                  <Home size={20} />
                  Home
                </Button>
              </Link>
              <Link to="/shorts">
                <Button variant="ghost" className="w-full justify-start gap-6 text-white hover:bg-red-900/20">
                  <Video size={20} />
                  Shorts
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Category Pills */}
          <div className="sticky top-[73px] z-40 bg-black/90 backdrop-blur-sm border-b border-red-900/30 p-4">
            <div className="flex gap-3 overflow-x-auto">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={index === 0 ? "default" : "secondary"}
                  size="sm"
                  className={`whitespace-nowrap ${
                    index === 0 
                      ? "bg-red-600 hover:bg-red-700 text-white" 
                      : "bg-gray-800 text-white hover:bg-red-900/20"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div className="p-4">
            {searchQuery && (
              <div className="mb-4">
                <p className="text-gray-300">
                  {filteredVideos.length > 0 
                    ? `Found ${filteredVideos.length} results for "${searchQuery}"`
                    : `No results found for "${searchQuery}"`
                  }
                </p>
              </div>
            )}

            {loading && videos.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="aspect-video rounded-xl bg-gray-800" />
                    <div className="flex gap-3">
                      <Skeleton className="w-9 h-9 rounded-full bg-gray-800" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 bg-gray-800" />
                        <Skeleton className="h-3 w-2/3 bg-gray-800" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videosToShow.map((video) => (
                  <div key={video.id} className="group cursor-pointer">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-3">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex gap-3">
                      <img
                        src={video.channelAvatar}
                        alt={video.channel}
                        className="w-9 h-9 rounded-full flex-shrink-0 mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2 text-white group-hover:text-red-400">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {video.channel}
                        </p>
                        <p className="text-sm text-gray-400">
                          {video.views} • {video.uploadTime}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-red-900/20">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Loading indicator for infinite scroll */}
            {loading && videos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="aspect-video rounded-xl bg-gray-800" />
                    <div className="flex gap-3">
                      <Skeleton className="w-9 h-9 rounded-full bg-gray-800" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 bg-gray-800" />
                        <Skeleton className="h-3 w-2/3 bg-gray-800" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
