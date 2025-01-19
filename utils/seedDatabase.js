import { db } from '../config/firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';
import menuItems from '../data/menuItems';

export async function seedMenuItems() {
  try {
    const batch = writeBatch(db);
    const menuCollectionRef = collection(db, 'menuItems');
    
    // Adding all menu items to the batch
    for (const item of menuItems) {
      const itemRef = doc(menuCollectionRef);
      batch.set(itemRef, {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
    // Commit the batch
    await batch.commit();
    console.log('Menu items added successfully!');
  } catch (error) {
    console.error('Error adding menu items:', error);
  }
}
