import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  startAfter,
  limit
} from 'firebase/firestore';

const COLLECTION_NAME = 'bills';
const BILLS_PER_PAGE = 10;

export const billService = {
  /**
   * Creates a new bill in Firestore with comprehensive validation
   * @param {Object} billData - The bill data to be created
   * @returns {Promise<Object>} Created bill with Firestore document ID
   */
  async createBill(billData) {
    try {
      // Comprehensive input validation
      this._validateBillData(billData);

      // Sanitize and format bill data
      const bill = this._prepareBillData(billData);

      // Log bill data in development environment
      this._logBillData(bill);

      // Add bill to Firestore
      const docRef = await addDoc(collection(db, COLLECTION_NAME), bill);
      return { ...bill, id: docRef.id };
    } catch (error) {
      console.error('Bill Creation Error:', error);
      throw new Error(`Bill Creation Failed: ${error.message}`);
    }
  },

  /**
   * Retrieves bills for a specific user with pagination support
   * @param {string} userId - The user's unique identifier
   * @param {Object} [options] - Optional pagination and filtering options
   * @returns {Promise<Object>} Paginated bills with pagination metadata
   */
  async getUserBills(userId, options = {}) {
    try {
      if (!userId) throw new Error('User ID is required');

      // Construct query with flexible pagination
      const baseQuery = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      // Apply optional pagination
      const paginatedQuery = options.lastVisible
        ? query(baseQuery, startAfter(options.lastVisible), limit(BILLS_PER_PAGE))
        : query(baseQuery, limit(BILLS_PER_PAGE));

      const querySnapshot = await getDocs(paginatedQuery);
      
      const bills = querySnapshot.docs.map(this._transformBillDocument);
      
      return {
        bills,
        lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
        hasMore: bills.length === BILLS_PER_PAGE
      };
    } catch (error) {
      console.error('Bill Retrieval Error:', error);
      throw new Error(`Bill Retrieval Failed: ${error.message}`);
    }
  },

  /**
   * Internal method to validate bill data
   * @private
   * @param {Object} billData - Bill data to validate
   */
  _validateBillData(billData) {
    if (!billData.userId) throw new Error('User ID is required');
    if (!Array.isArray(billData.items) || billData.items.length === 0) {
      throw new Error('Valid items array is required');
    }
    if (typeof billData.total !== 'number' || billData.total <= 0) {
      throw new Error('Valid total amount is required');
    }
    if (!billData.paymentDetails?.method || !billData.paymentDetails?.status) {
      throw new Error('Complete payment details are required');
    }
  },

  /**
   * Prepares bill data for Firestore storage
   * @private
   * @param {Object} billData - Raw bill data
   * @returns {Object} Formatted bill data
   */
  _prepareBillData(billData) {
    return {
      userId: billData.userId,
      items: billData.items.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity)
      })),
      total: Number(billData.total),
      paymentDetails: {
        ...billData.paymentDetails,
        timestamp: Timestamp.now()
      },
      status: billData.status || 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
  },

  /**
   * Transforms Firestore bill document for consistent client-side use
   * @private
   * @param {Object} doc - Firestore document snapshot
   * @returns {Object} Transformed bill document
   */
  _transformBillDocument(doc) {
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
  },

  /**
   * Logs bill data in development environment
   * @private
   * @param {Object} bill - Bill data to log
   */
  _logBillData(bill) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Bill Data:', JSON.stringify(bill, null, 2));
    }
  }
};