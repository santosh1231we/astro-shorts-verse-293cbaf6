
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share, MessageSquare, Play, Pause } from "lucide-react";

interface Short {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

const Index = () => {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock data for astronomy shorts
  const mockShorts: Short[] = [
    {
      id: "1",
      title: "The Pillars of Creation - Eagle Nebula",
      description: "Witness the birthplace of stars in this stunning Hubble image of the Eagle Nebula's iconic pillars.",
      imageUrl: "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?w=400&h=800&fit=crop",
      hashtags: ["#astronomy", "#hubble", "#nebula", "#space", "#nasa"],
      likes: 12400,
      comments: 890,
      shares: 340,
      isLiked: false
    },
    {
      id: "2", 
      title: "Saturn's Majestic Rings",
      description: "Explore the incredible ring system of Saturn captured by the Cassini spacecraft.",
      imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=800&fit=crop",
      hashtags: ["#saturn", "#cassini", "#rings", "#planets", "#space"],
      likes: 8900,
      comments: 456,
      shares: 234,
      isLiked: true
    },
    {
      id: "3",
      title: "Andromeda Galaxy Approaching",
      description: "Did you know the Andromeda Galaxy is racing toward us at 250,000 mph? Don't worry, collision is in 4.5 billion years!",
      imageUrl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=800&fit=crop",
      hashtags: ["#andromeda", "#galaxy", "#milkyway", "#collision", "#future"],
      likes: 15600,
      comments: 1200,
      shares: 567,
      isLiked: false
    },
    {
      id: "4",
      title: "Black Hole Event Horizon",
      description: "Journey to the edge of a black hole where time stands still and space warps beyond imagination.",
      imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=800&fit=crop",
      hashtags: ["#blackhole", "#eventhorizon", "#physics", "#spacetime", "#science"],
      likes: 20100,
      comments: 1580,
      shares: 890,
      isLiked: false
    },
    {
      id: "5",
      title: "Mars Rover Discovery",
      description: "Latest images from Perseverance reveal ancient river beds on Mars, evidence of water flowing billions of years ago.",
      imageUrl: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=400&h=800&fit=crop",
      hashtags: ["#mars", "#perseverance", "#rover", "#water", "#discovery"],
      likes: 9800,
      comments: 567,
      shares: 289,
      isLiked: true
    }
  ];

  useEffect(() => {
    setShorts(mockShorts);
  }, []);

  const handleLike = (id: string) => {
    setShorts(shorts.map(short => 
      short.id === id 
        ? { 
            ...short, 
            isLiked: !short.isLiked,
            likes: short.isLiked ? short.likes - 1 : short.likes + 1
          }
        : short
    ));
  };

  const handleShare = (short: Short) => {
    if (navigator.share) {
      navigator.share({
        title: short.title,
        text: short.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${short.title} - ${window.location.href}`);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight;
    const newIndex = Math.round(scrollTop / itemHeight);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="h-screen w-full bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Astro Shorts</h1>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-white">
              Following
            </Button>
            <Button variant="ghost" size="sm" className="text-white bg-white/20">
              For You
            </Button>
          </div>
        </div>
      </div>

      {/* Shorts Feed */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {shorts.map((short, index) => (
          <div
            key={short.id}
            className="h-screen w-full relative snap-start snap-always flex-shrink-0"
          >
            {/* Background Image/Video */}
            <div className="absolute inset-0">
              <img
                src={short.imageUrl}
                alt={short.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>

            {/* Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="lg"
                className="w-16 h-16 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </Button>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex justify-between items-end">
                {/* Left Side - Content */}
                <div className="flex-1 mr-4">
                  <h2 className="text-lg font-semibold mb-2 leading-tight">
                    {short.title}
                  </h2>
                  <p className="text-sm text-gray-200 mb-3 leading-relaxed">
                    {short.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {short.hashtags.map((hashtag, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-blue-300 hover:text-blue-200 cursor-pointer"
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side - Actions */}
                <div className="flex flex-col gap-6 items-center">
                  <div className="flex flex-col items-center">
                    <Button
                      variant="ghost"
                      size="lg"
                      className={`w-12 h-12 rounded-full p-0 ${
                        short.isLiked 
                          ? 'text-red-500 bg-red-500/20' 
                          : 'text-white bg-black/30'
                      } hover:bg-red-500/30 transition-all`}
                      onClick={() => handleLike(short.id)}
                    >
                      <Heart 
                        size={24} 
                        fill={short.isLiked ? 'currentColor' : 'none'}
                      />
                    </Button>
                    <span className="text-xs mt-1">{formatCount(short.likes)}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-12 h-12 rounded-full p-0 text-white bg-black/30 hover:bg-white/20 transition-all"
                    >
                      <MessageSquare size={24} />
                    </Button>
                    <span className="text-xs mt-1">{formatCount(short.comments)}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-12 h-12 rounded-full p-0 text-white bg-black/30 hover:bg-white/20 transition-all"
                      onClick={() => handleShare(short)}
                    >
                      <Share size={24} />
                    </Button>
                    <span className="text-xs mt-1">{formatCount(short.shares)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="flex flex-col gap-1">
                {shorts.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1 h-8 rounded-full transition-all ${
                      idx === index ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Index;
