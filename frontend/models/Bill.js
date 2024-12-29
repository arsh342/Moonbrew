export class Bill {
  constructor({
    id = null,
    userId,
    items,
    total,
    status = 'pending',
    paymentDetails,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    if (!userId) throw new Error('userId is required');
    if (!Array.isArray(items) || items.length === 0) throw new Error('items array is required');
    if (typeof total !== 'number' || total <= 0) throw new Error('valid total is required');
    if (!paymentDetails || !paymentDetails.method || !paymentDetails.status || !paymentDetails.transactionId) {
      throw new Error('valid payment details are required');
    }

    this.id = id;
    this.userId = userId;
    this.items = items.map(item => ({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity)
    }));
    this.total = Number(total);
    this.status = status;
    this.paymentDetails = {
      method: paymentDetails.method,
      status: paymentDetails.status,
      transactionId: paymentDetails.transactionId,
      timestamp: paymentDetails.timestamp || new Date()
    };
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toFirestore() {
    return {
      userId: this.userId,
      items: this.items.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity)
      })),
      total: Number(this.total),
      status: this.status,
      paymentDetails: {
        method: this.paymentDetails.method,
        status: this.paymentDetails.status,
        transactionId: this.paymentDetails.transactionId,
        timestamp: this.paymentDetails.timestamp
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
} 