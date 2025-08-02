import React, { useState, useEffect } from "react";
import './App.css';

import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc
} from 'firebase/firestore';

const ApostleTagApp = () => {
  const [tags, setTags] = useState(
    Array.from({ length: 25 }, (_, i) => ({
      id: (i + 1).toString().padStart(2, '0'),
      holder: "",
      lastPlayed: "",
      status: "Active"
    }))
  );

  const calculateStatus = (lastDate) => {
    if (!lastDate) return "Active";
    const now = new Date();
    const last = new Date(lastDate);
    const diff = (now - last) / (1000 * 60 * 60 * 24);
    if (diff > 28) return "Overdue";
    if (diff > 21) return "Expiring";
    return "Active";
  };

  useEffect(() => {
    const fetchTags = async () => {
      const querySnapshot = await getDocs(collection(db, "apostleTags"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      if (data.length > 0) {
        setTags(data.map(tag => ({
          ...tag,
          status: calculateStatus(tag.lastPlayed)
        })));
      }
    };

    fetchTags();
  }, []);

  const updateTag = (id, field, value) => {
    setTags(prev =>
      prev.map(tag =>
        tag.id === id ? { ...tag, [field]: value } : tag
      )
    );

    const updatedTag = { ...tags.find(tag => tag.id === id), [field]: value };
    setDoc(doc(db, "apostleTags", id), updatedTag);
  };

  return (
    <div className="container">
      {tags.map(tag => (
 <div key={tag.id} className="card">
          <h2>Apostle Tag #{tag.id}</h2>
          <input
            type="text"
            placeholder="Current Holder"
            value={tag.holder}
            onChange={(e) => updateTag(tag.id, "holder", e.target.value)}
          />
          <input
            type="date"
            value={tag.lastPlayed}
            onChange={(e) => updateTag(tag.id, "lastPlayed", e.target.value)}
          />
          <div className={`status ${tag.status}`}>Status: {tag.status}</div>
        </div>
      ))}
    </div>
  );
};
export default ApostleTagApp;
