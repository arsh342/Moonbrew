import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import menuItems from '../data/menuItems';

export async function seedMenuItems() {
  try {
    for (const item of menuItems) {
      await addDoc(collection(db, 'menuItems'), {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    console.log('Menu items added successfully!');
  } catch (error) {
    console.error('Error adding menu items:', error);
  }
} 