import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Menu, 
  Search, 
  Upload, 
  Bell, 
  User, 
  Home,
  Video,
  ThumbsUp,
  Share,
  MoreHorizontal
} from "lucide-react";

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

  // Mock YouTube-style video data
  const videos: Video[] = [
    {
      id: "1",
      title: "NASA's James Webb Space Telescope Captures Stunning Galaxy Images",
      channel: "NASA Official",
      views: "2.1M views",
      uploadTime: "3 days ago",
      thumbnail: "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?w=400&h=225&fit=crop",
      channelAvatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=40&h=40&fit=crop&crop=face",
      duration: "12:34"
    },
    {
      id: "2",
      title: "Saturn's Rings Explained: What Cassini Taught Us",
      channel: "Space Exploration",
      views: "856K views",
      uploadTime: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=225&fit=crop",
      channelAvatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=40&h=40&fit=crop&crop=face",
      duration: "8:42"
    },
    {
      id: "3",
      title: "Andromeda Galaxy Collision: What Will Happen to Earth?",
      channel: "Cosmic Discoveries",
      views: "1.3M views",
      uploadTime: "5 days ago",
      thumbnail: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=225&fit=crop",
      channelAvatar: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop&crop=face",
      duration: "15:21"
    },
    {
      id: "4",
      title: "Black Holes: Journey to the Event Horizon",
      channel: "Physics Explained",
      views: "3.2M views",
      uploadTime: "2 weeks ago",
      thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=225&fit=crop",
      channelAvatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=40&h=40&fit=crop&crop=face",
      duration: "22:18"
    },
    {
      id: "5",
      title: "Mars Rover Perseverance: Latest Discoveries",
      channel: "Mars Mission Updates",
      views: "674K views",
      uploadTime: "4 days ago",
      thumbnail: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=400&h=225&fit=crop",
      channelAvatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=40&h=40&fit=crop&crop=face",
      duration: "9:55"
    },
    {
      id: "6",
      title: "Solar System Formation: From Dust to Planets",
      channel: "Astronomy Today",
      views: "1.8M views",
      uploadTime: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?w=400&h=225&fit=crop",
      channelAvatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=40&h=40&fit=crop&crop=face",
      duration: "18:30"
    }
  ];

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
    } else {
      setFilteredVideos([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const videosToShow = filteredVideos.length > 0 ? filteredVideos : videos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-red-900/30">
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
        <aside className="w-64 hidden lg:block border-r border-red-900/30 min-h-screen bg-black/20">
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
          <div className="sticky top-[73px] z-40 bg-black/80 backdrop-blur-sm border-b border-red-900/30 p-4">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
