import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { Bill } from '../models/Bill';

const COLLECTION_NAME = 'bills';

export const billService = {
  async createBill(billData) {
    try {
      // Validate inputs
      if (!billData.userId) throw new Error('User ID is required');
      if (!Array.isArray(billData.items) || billData.items.length === 0) throw new Error('Items are required');
      if (typeof billData.total !== 'number' || billData.total <= 0) throw new Error('Valid total is required');
      if (!billData.paymentDetails || !billData.paymentDetails.method || !billData.paymentDetails.status) {
        throw new Error('Valid payment details are required');
      }

      // Format items
      const formattedItems = billData.items.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity)
      }));

      const bill = {
        userId: billData.userId,
        items: formattedItems,
        total: Number(billData.total),
        paymentDetails: {
          ...billData.paymentDetails,
          timestamp: Timestamp.now()
        },
        status: billData.status || 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      // Log the bill data before sending to Firestore
      console.log('Bill Data:', bill);

      const docRef = await addDoc(collection(db, COLLECTION_NAME), bill);
      return { ...bill, id: docRef.id };
    } catch (error) {
      console.error('Error creating bill:', error);
      throw new Error(`Failed to create bill: ${error.message}`);
    }
  },

  async getUserBills(userId) {
    try {
      if (!userId) throw new Error('User ID is required');

      const q = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      try {
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            paymentDetails: {
              ...data.paymentDetails,
              timestamp: data.paymentDetails?.timestamp?.toDate() || new Date()
            },
            items: data.items.map(item => ({
              ...item,
              price: Number(item.price),
              quantity: Number(item.quantity)
            })),
            total: Number(data.total)
          };
        });
      } catch (indexError) {
        if (indexError.code === 'failed-precondition') {
          console.log('Index is being created, please wait...');
          return [];
        }
        throw indexError;
      }
    } catch (error) {
      console.error('Error fetching user bills:', error);
      throw new Error(`Failed to fetch bills: ${error.message}`);
    }
  }
};