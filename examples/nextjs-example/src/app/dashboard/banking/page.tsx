'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Progress,
  Separator,
  LucideIcons,
} from '@tanqory/mies';

export default function BankingPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Banking Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your accounts, transactions, and financial overview.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <LucideIcons.Download className="w-4 h-4 mr-2" />
              Statement
            </Button>
            <Button>
              <LucideIcons.Send className="w-4 h-4 mr-2" />
              Transfer
            </Button>
          </div>
        </div>

        {/* Account Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <LucideIcons.CreditCard className="w-8 h-8" />
                  <span className="text-sm opacity-80">**** 4532</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm opacity-80">Checking Account</p>
                  <p className="text-2xl font-bold">$12,543.89</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <LucideIcons.PiggyBank className="w-8 h-8" />
                  <span className="text-sm opacity-80">**** 7821</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm opacity-80">Savings Account</p>
                  <p className="text-2xl font-bold">$45,231.67</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <LucideIcons.Wallet className="w-8 h-8" />
                  <span className="text-sm opacity-80">**** 9456</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm opacity-80">Credit Card</p>
                  <p className="text-2xl font-bold">$2,543.21</p>
                  <p className="text-xs opacity-70">Available: $7,456.79</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Monthly Income</p>
                  <p className="text-2xl font-bold">$8,450.00</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> vs last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <LucideIcons.TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Monthly Expenses</p>
                  <p className="text-2xl font-bold">$3,245.67</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">+8.2%</span> vs last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <LucideIcons.TrendingDown className="w-4 h-4 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Investment</p>
                  <p className="text-2xl font-bold">$15,678.45</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+5.4%</span> portfolio gain
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <LucideIcons.LineChart className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Goals Progress</p>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15%</span> this quarter
                  </p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <LucideIcons.Target className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spending Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Spending Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <LucideIcons.PieChart className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Spending Chart</p>
                    <p className="text-sm text-muted-foreground">
                      Monthly spending breakdown by category
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Spending Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Spending Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Food & Dining</span>
                  </div>
                  <span className="text-sm font-medium">$845.32</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Shopping</span>
                  </div>
                  <span className="text-sm font-medium">$623.45</span>
                </div>
                <Progress value={55} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Transportation</span>
                  </div>
                  <span className="text-sm font-medium">$432.18</span>
                </div>
                <Progress value={38} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Entertainment</span>
                  </div>
                  <span className="text-sm font-medium">$289.76</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Utilities</span>
                  </div>
                  <span className="text-sm font-medium">$156.89</span>
                </div>
                <Progress value={14} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: 'expense',
                  description: 'Grocery Store',
                  category: 'Food & Dining',
                  amount: '-$87.32',
                  date: '2 hours ago',
                  icon: LucideIcons.ShoppingCart,
                },
                {
                  type: 'income',
                  description: 'Salary Deposit',
                  category: 'Income',
                  amount: '+$3,500.00',
                  date: '1 day ago',
                  icon: LucideIcons.ArrowDownLeft,
                },
                {
                  type: 'expense',
                  description: 'Gas Station',
                  category: 'Transportation',
                  amount: '-$45.67',
                  date: '2 days ago',
                  icon: LucideIcons.Car,
                },
                {
                  type: 'expense',
                  description: 'Netflix Subscription',
                  category: 'Entertainment',
                  amount: '-$15.99',
                  date: '3 days ago',
                  icon: LucideIcons.Tv,
                },
                {
                  type: 'expense',
                  description: 'Coffee Shop',
                  category: 'Food & Dining',
                  amount: '-$4.50',
                  date: '3 days ago',
                  icon: LucideIcons.Coffee,
                },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <transaction.icon className={`w-5 h-5 ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}