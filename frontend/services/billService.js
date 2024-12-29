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
  async createBill(userId, items, total, paymentDetails) {
    try {
      // Validate inputs
      if (!userId) throw new Error('User ID is required');
      if (!Array.isArray(items) || items.length === 0) throw new Error('Items are required');
      if (typeof total !== 'number' || total <= 0) throw new Error('Valid total is required');
      if (!paymentDetails) throw new Error('Payment details are required');

      // Format items
      const formattedItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity)
      }));

      const bill = new Bill({
        userId,
        items: formattedItems,
        total: Number(total),
        paymentDetails: {
          method: paymentDetails.method,
          status: paymentDetails.status,
          transactionId: paymentDetails.transactionId,
          timestamp: Timestamp.now()
        },
        status: 'pending', // Initial status
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      const docRef = await addDoc(collection(db, COLLECTION_NAME), bill.toFirestore());
      const createdBill = { ...bill, id: docRef.id };
      return createdBill;
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