import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function OrderHistory({ orders }) {
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Debug log to check orders data
  console.log('Orders:', orders);
  console.log('Filtered Orders:', filteredOrders);

  return (
    <div className="bg-cream-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Order History</h1>
          <p className="text-gray-700">Track and manage your coffee orders</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-800 font-medium">Filter by:</span>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded-full px-4 py-2 bg-cream-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <span className="font-medium text-gray-900">Total Orders:</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {orders.length}
              </span>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <motion.div 
          className="grid gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              variants={item}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="border-l-4 border-green-700">
                {/* Order Header */}
                <div className="p-6 bg-cream-50">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900">Order #{order.id.slice(-8)}</h3>
                      <p className="text-sm text-gray-700">
                        {order.createdAt instanceof Date 
                          ? `${order.createdAt.toLocaleDateString()} at ${order.createdAt.toLocaleTimeString()}`
                          : 'Date not available'}
                      </p>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-cream-50">
                            <Image
                              src={item.image || '/placeholder-coffee.jpg'}
                              alt={item.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-700">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Details */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-700 mb-2">
                      <span className="font-medium text-gray-900">Payment Method:</span>{' '}
                      {order.paymentDetails?.method || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-700 mb-4">
                      <span className="font-medium text-gray-900">Transaction ID:</span>{' '}
                      {order.paymentDetails?.transactionId || 'N/A'}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800">Subtotal</span>
                      <span className="text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 font-bold text-lg">
                      <span className="text-gray-900">Total</span>
                      <span className="text-green-700">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <Image
                src="/empty-orders.svg"
                alt="No orders"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">No Orders Found</h3>
            <p className="text-gray-700">
              {selectedStatus === 'all' 
                ? "You haven't placed any orders yet."
                : `No ${selectedStatus} orders found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 