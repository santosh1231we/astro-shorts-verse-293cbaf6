
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter, DocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FirebaseVideo {
  id: string;
  title: string;
  channel: string;
  views: string;
  uploadTime: string;
  thumbnail: string;
  channelAvatar: string;
  duration: string;
  type: 'video' | 'short';
}

export const useFirebaseData = () => {
  const [videos, setVideos] = useState<FirebaseVideo[]>([]);
  const [shorts, setShorts] = useState<FirebaseVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      console.log('Loading initial data from Firebase...');
      
      // Load videos
      const videosQuery = query(
        collection(db, 'videos'),
        orderBy('uploadTime', 'desc'),
        limit(12)
      );
      const videosSnapshot = await getDocs(videosQuery);
      const videosData = videosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseVideo[];
      
      // Load shorts
      const shortsQuery = query(
        collection(db, 'shorts'),
        orderBy('uploadTime', 'desc'),
        limit(10)
      );
      const shortsSnapshot = await getDocs(shortsQuery);
      const shortsData = shortsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseVideo[];

      setVideos(videosData);
      setShorts(shortsData);
      setLastDoc(videosSnapshot.docs[videosSnapshot.docs.length - 1] || null);
      setHasMore(videosSnapshot.docs.length === 12);
      
      console.log('Loaded videos:', videosData.length);
      console.log('Loaded shorts:', shortsData.length);
    } catch (error) {
      console.error('Error loading Firebase data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreVideos = async () => {
    if (!hasMore || !lastDoc) return;

    try {
      console.log('Loading more videos...');
      const videosQuery = query(
        collection(db, 'videos'),
        orderBy('uploadTime', 'desc'),
        startAfter(lastDoc),
        limit(12)
      );
      const videosSnapshot = await getDocs(videosQuery);
      const newVideos = videosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseVideo[];

      setVideos(prev => [...prev, ...newVideos]);
      setLastDoc(videosSnapshot.docs[videosSnapshot.docs.length - 1] || null);
      setHasMore(videosSnapshot.docs.length === 12);
      
      console.log('Loaded additional videos:', newVideos.length);
    } catch (error) {
      console.error('Error loading more videos:', error);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return {
    videos,
    shorts,
    loading,
    hasMore,
    loadMoreVideos
  };
};
