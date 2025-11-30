import { useState } from 'react';
import JournalLayout from '../components/JournalLayout';
import JournalGrid from '../components/JournalGrid';
import { notes } from '../data/notes';
import { books, games, channels } from '../data/personal';

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const getFilteredItems = () => {
    let items = [];
    switch (activeTab) {
      case 'engineering':
        items = [...notes];
        break;
      case 'library':
        items = [...books];
        break;
      case 'gaming':
        items = [...games];
        break;
      case 'media':
        items = [...channels];
        break;
      default:
        items = [...notes, ...books, ...games, ...channels];
    }

    return items.sort((a, b) => {
      const dateA = new Date('isoDate' in a ? a.isoDate : a.date).getTime();
      const dateB = new Date('isoDate' in b ? b.isoDate : b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  const toggleSort = () => {
    setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  return (
    <JournalLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      sortOrder={sortOrder}
      onSortChange={toggleSort}
    >
      <JournalGrid items={getFilteredItems()} />
    </JournalLayout>
  );
}
