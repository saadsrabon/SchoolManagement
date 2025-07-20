
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign, History, AlertCircle, CheckCircle, Clock, Phone } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const FeePage = () => {
  const [selectedChild, setSelectedChild] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [bkashNumber, setBkashNumber] = useState('');

  const children = [
    {
      id: 1,
      name: "Alice Johnson",
      class: "Grade 10A",
      monthlyFee: 8000,
      dueAmount: 15000,
      totalPaid: 40000,
      lastPayment: "2024-01-15"
    },
    {
      id: 2,
      name: "Bob Johnson",
      class: "Grade 8B",
      monthlyFee: 7000,
      dueAmount: 7000,
      totalPaid: 28000,
      lastPayment: "2024-01-10"
    }
  ];

  const paymentHistory = [
    { id: 1, date: "2024-01-15", amount: 8000, method: "bKash", status: "Paid", receipt: "TXN123456" },
    { id: 2, date: "2024-12-15", amount: 8000, method: "Bank Transfer", status: "Paid", receipt: "TXN123455" },
    { id: 3, date: "2024-11-15", amount: 8000, method: "bKash", status: "Paid", receipt: "TXN123454" },
    { id: 4, date: "2024-10-15", amount: 8000, method: "Cash", status: "Paid", receipt: "TXN123453" }
  ];

  const feeBreakdown = [
    { category: "Tuition Fee", amount: 6000 },
    { category: "Lab Fee", amount: 1000 },
    { category: "Library Fee", amount: 500 },
    { category: "Sports Fee", amount: 300 },
    { category: "Transportation", amount: 200 }
  ];

  const handleBkashPayment = () => {
    if (!paymentAmount || !bkashNumber) {
      toast.error('Please enter payment amount and bKash number');
      return;
    }
    
    toast.success(`Payment of ৳${paymentAmount} initiated via bKash. You will receive a confirmation SMS.`);
    setPaymentAmount('');
    setBkashNumber('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentChild = children[selectedChild];

  return (
    <DashboardLayout role="parent" title="Fee Management">
      <div className="space-y-6">
        {/* Child Selection */}
        <div className="flex space-x-2">
          {children.map((child, index) => (
            <Button
              key={child.id}
              variant={selectedChild === index ? "default" : "outline"}
              onClick={() => setSelectedChild(index)}
            >
              {child.name}
            </Button>
          ))}
        </div>

        {/* Fee Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Fee</p>
                  <p className="text-2xl font-bold text-blue-600">৳{currentChild.monthlyFee.toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Due Amount</p>
                  <p className="text-2xl font-bold text-red-600">৳{currentChild.dueAmount.toLocaleString()}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Paid</p>
                  <p className="text-2xl font-bold text-green-600">৳{currentChild.totalPaid.toLocaleString()}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Payment</p>
                  <p className="text-lg font-bold text-gray-900">{currentChild.lastPayment}</p>
                </div>
                <History className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="breakdown">Fee Breakdown</TabsTrigger>
            <TabsTrigger value="payment">Make Payment</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Overview for {currentChild.name}</CardTitle>
                <CardDescription>Current fee status and payment summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Class:</span>
                    <span>{currentChild.class}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Monthly Fee:</span>
                    <span className="text-blue-600 font-bold">৳{currentChild.monthlyFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <span className="font-medium">Outstanding Amount:</span>
                    <span className="text-red-600 font-bold">৳{currentChild.dueAmount.toLocaleString()}</span>
                  </div>
                  {currentChild.dueAmount > 0 && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="text-yellow-800">Payment due. Please make payment at your earliest convenience.</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>All payment transactions for {currentChild.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Receipt</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell className="font-medium">৳{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-blue-600">{payment.receipt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fee Breakdown Tab */}
          <TabsContent value="breakdown">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Fee Breakdown</CardTitle>
                <CardDescription>Detailed breakdown of monthly fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {feeBreakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-blue-600 font-bold">৳{item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="font-bold text-lg">Total Monthly Fee</span>
                    <span className="text-blue-600 font-bold text-lg">৳{currentChild.monthlyFee.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Make Payment Tab */}
          <TabsContent value="payment">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* bKash Payment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-pink-600" />
                    Pay via bKash
                  </CardTitle>
                  <CardDescription>Make payment using bKash mobile banking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Payment Amount (৳)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bkash">bKash Number</Label>
                    <Input
                      id="bkash"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={bkashNumber}
                      onChange={(e) => setBkashNumber(e.target.value)}
                    />
                  </div>
                  <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                    <p className="text-sm text-pink-800">
                      <strong>School bKash Number:</strong> 01712-345678
                    </p>
                    <p className="text-sm text-pink-800 mt-1">
                      Reference: {currentChild.name} - {currentChild.class}
                    </p>
                  </div>
                  <Button onClick={handleBkashPayment} className="w-full bg-pink-600 hover:bg-pink-700">
                    Pay with bKash
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Instructions</CardTitle>
                  <CardDescription>How to make payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">bKash Payment</h4>
                      <p className="text-sm text-blue-700">Send money to school bKash number with student reference</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Bank Transfer</h4>
                      <p className="text-sm text-green-700">
                        <strong>Account:</strong> 1234567890<br />
                        <strong>Bank:</strong> ABC Bank Ltd<br />
                        <strong>Branch:</strong> Main Branch
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800">Cash Payment</h4>
                      <p className="text-sm text-yellow-700">Visit school office during office hours (9 AM - 4 PM)</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Always mention student name and class as reference for all payments.
                      Payment confirmation will be updated within 24 hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FeePage;
