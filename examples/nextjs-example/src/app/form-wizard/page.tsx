'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Progress,
  Alert,
  AlertDescription,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: any;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Personal Info',
    description: 'Basic information about yourself',
    icon: LucideIcons.User,
  },
  {
    id: 2,
    title: 'Account Details',
    description: 'Setup your account preferences',
    icon: LucideIcons.Settings,
  },
  {
    id: 3,
    title: 'Verification',
    description: 'Verify your email and phone',
    icon: LucideIcons.Shield,
  },
  {
    id: 4,
    title: 'Complete',
    description: 'Review and finish setup',
    icon: LucideIcons.CheckCircle,
  },
];

function StepIndicator({ steps, currentStep }: { steps: Step[]; currentStep: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Setup Progress</h3>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </span>
      </div>

      <Progress value={(currentStep / steps.length) * 100} className="h-2" />

      <div className="flex justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index + 1 === currentStep;
          const isCompleted = index + 1 < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center space-y-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted
                    ? 'bg-primary border-primary text-primary-foreground'
                    : isActive
                    ? 'border-primary text-primary'
                    : 'border-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <LucideIcons.Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <div className="text-center">
                <p className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MultiStepForm() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    // Step 1
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Step 2
    username: '',
    password: '',
    notifications: false,
    newsletter: true,
    // Step 3
    emailVerified: false,
    phoneVerified: false,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        break;
      case 2:
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password && formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    alert('Form submitted successfully!');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => updateFormData('username', e.target.value)}
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) => updateFormData('notifications', checked)}
                />
                <Label htmlFor="notifications">Enable push notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => updateFormData('newsletter', checked)}
                />
                <Label htmlFor="newsletter">Subscribe to newsletter</Label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Alert>
              <LucideIcons.Info className="h-4 w-4" />
              <AlertDescription>
                Please verify your email and phone number to complete the setup.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <LucideIcons.Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email Verification</p>
                    <p className="text-sm text-muted-foreground">{formData.email}</p>
                  </div>
                </div>
                <Button
                  variant={formData.emailVerified ? 'success' : 'outline'}
                  size="sm"
                  onClick={() => updateFormData('emailVerified', !formData.emailVerified)}
                >
                  {formData.emailVerified ? (
                    <>
                      <LucideIcons.Check className="h-4 w-4 mr-2" />
                      Verified
                    </>
                  ) : (
                    'Verify Email'
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <LucideIcons.Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone Verification</p>
                    <p className="text-sm text-muted-foreground">{formData.phone}</p>
                  </div>
                </div>
                <Button
                  variant={formData.phoneVerified ? 'success' : 'outline'}
                  size="sm"
                  onClick={() => updateFormData('phoneVerified', !formData.phoneVerified)}
                >
                  {formData.phoneVerified ? (
                    <>
                      <LucideIcons.Check className="h-4 w-4 mr-2" />
                      Verified
                    </>
                  ) : (
                    'Verify Phone'
                  )}
                </Button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <LucideIcons.Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Setup Complete!</h3>
              <p className="text-muted-foreground mt-2">
                Your account has been successfully created and verified.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg text-left space-y-2">
              <h4 className="font-medium">Account Summary:</h4>
              <div className="text-sm space-y-1">
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Username:</strong> {formData.username}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
              </div>
            </div>

            <Button onClick={handleSubmit} size="lg" className="w-full">
              Complete Setup
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
          <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {currentStep < 4 && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <LucideIcons.ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={nextStep}>
            Next
            <LucideIcons.ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function FormWizardPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Form Wizard</h1>
            <p className="text-muted-foreground text-lg">
              Multi-step forms with validation, progress tracking, and guided user experience
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">3 Wizard Types</Badge>
            <Badge variant="outline">Step Validation</Badge>
            <Badge variant="outline">Progress Tracking</Badge>
          </div>
        </div>

        {/* Main Form Wizard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.FileText className="h-5 w-5" />
              Account Setup Wizard
            </CardTitle>
            <CardDescription>
              Complete multi-step form with validation and progress tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MultiStepForm />
          </CardContent>
        </Card>

        {/* Form Wizard Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Settings className="h-5 w-5" />
              Form Wizard Features
            </CardTitle>
            <CardDescription>
              Available features and capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: LucideIcons.CheckSquare, title: 'Step Validation', description: 'Validate each step before proceeding' },
                { icon: LucideIcons.BarChart, title: 'Progress Tracking', description: 'Visual progress indicators' },
                { icon: LucideIcons.Save, title: 'Auto Save', description: 'Automatically save form data' },
                { icon: LucideIcons.ArrowLeft, title: 'Navigation', description: 'Forward and backward navigation' },
                { icon: LucideIcons.AlertTriangle, title: 'Error Handling', description: 'Clear error messages and validation' },
                { icon: LucideIcons.Smartphone, title: 'Responsive', description: 'Works on all device sizes' },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center space-y-3 p-4 border rounded-lg">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}