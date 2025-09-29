'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Alert,
  AlertDescription,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';

// Form validation utilities
interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  value: string;
  error?: string;
  rules?: ValidationRule;
  options?: { value: string; label: string }[];
}

const validateField = (value: string, rules?: ValidationRule): string | null => {
  if (!rules) return null;

  if (rules.required && !value.trim()) {
    return 'This field is required';
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Minimum length is ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Maximum length is ${rules.maxLength} characters`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Please enter a valid format';
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium',
    newsletter: false
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const validationRules: Record<string, ValidationRule> = {
    name: { required: true, minLength: 2, maxLength: 50 },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      custom: (value) => {
        if (value && !value.includes('@')) return 'Please enter a valid email address';
        return null;
      }
    },
    phone: {
      pattern: /^[\+]?[1-9][\d]{0,15}$/,
      custom: (value) => {
        if (value && value.length < 10) return 'Phone number must be at least 10 digits';
        return null;
      }
    },
    message: { required: true, minLength: 10, maxLength: 500 }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    Object.entries(validationRules).forEach(([field, rules]) => {
      const error = validateField(formData[field as keyof typeof formData] as string, rules);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        priority: 'medium',
        newsletter: false
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'success' && (
        <Alert>
          <LucideIcons.CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Your message has been sent successfully! We'll get back to you soon.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="destructive">
          <LucideIcons.AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Something went wrong. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <LucideIcons.AlertTriangle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <LucideIcons.AlertTriangle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter your phone number"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <LucideIcons.AlertTriangle className="h-3 w-3" />
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="support">Technical Support</SelectItem>
              <SelectItem value="billing">Billing Question</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Priority Level</Label>
        <RadioGroup
          value={formData.priority}
          onValueChange={(value) => handleInputChange('priority', value)}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high">High</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          placeholder="Describe your inquiry in detail..."
          rows={5}
          className={errors.message ? 'border-red-500' : ''}
        />
        {errors.message && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <LucideIcons.AlertTriangle className="h-3 w-3" />
            {errors.message}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          {formData.message.length}/500 characters
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter"
          checked={formData.newsletter}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletter: !!checked }))}
        />
        <Label htmlFor="newsletter" className="text-sm">
          Subscribe to our newsletter for updates and news
        </Label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="min-w-32">
          {isSubmitting ? (
            <>
              <LucideIcons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <LucideIcons.Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              subject: '',
              message: '',
              priority: 'medium',
              newsletter: false
            });
            setErrors({});
            setSubmitStatus('idle');
          }}
        >
          Clear Form
        </Button>
      </div>
    </form>
  );
}

// Dynamic Form Builder Component
function DynamicFormBuilder() {
  const [fields, setFields] = React.useState<FormField[]>([
    { name: 'name', label: 'Name', type: 'text', value: '' },
    { name: 'email', label: 'Email', type: 'email', value: '' }
  ]);

  const [newField, setNewField] = React.useState({
    name: '',
    label: '',
    type: 'text' as FormField['type']
  });

  const addField = () => {
    if (!newField.name || !newField.label) return;

    const field: FormField = {
      name: newField.name,
      label: newField.label,
      type: newField.type,
      value: ''
    };

    setFields(prev => [...prev, field]);
    setNewField({ name: '', label: '', type: 'text' });
  };

  const removeField = (index: number) => {
    setFields(prev => prev.filter((_, i) => i !== index));
  };

  const updateFieldValue = (index: number, value: string) => {
    setFields(prev => prev.map((field, i) =>
      i === index ? { ...field, value } : field
    ));
  };

  return (
    <div className="space-y-6">
      {/* Form Builder */}
      <div className="border rounded-lg p-4 space-y-4">
        <h4 className="font-medium">Add New Field</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Field name"
            value={newField.name}
            onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            placeholder="Field label"
            value={newField.label}
            onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
          />
          <Select value={newField.type} onValueChange={(value) => setNewField(prev => ({ ...prev, type: value as FormField['type'] }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="password">Password</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="textarea">Textarea</SelectItem>
              <SelectItem value="select">Select</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addField}>
            <LucideIcons.Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </div>
      </div>

      {/* Generated Form */}
      <div className="space-y-4">
        <h4 className="font-medium">Generated Form</h4>
        <div className="border rounded-lg p-6 space-y-4">
          {fields.map((field, index) => (
            <div key={index} className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>{field.label}</Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    value={field.value}
                    onChange={(e) => updateFieldValue(index, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <Input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => updateFieldValue(index, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeField(index)}
              >
                <LucideIcons.Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <LucideIcons.FormInput className="h-12 w-12 mx-auto mb-2" />
              <p>No fields added yet. Use the form builder above to add fields.</p>
            </div>
          )}
        </div>
      </div>

      {/* Form JSON Output */}
      <div className="space-y-2">
        <Label>Form JSON Output</Label>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
          {JSON.stringify(fields, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// Conditional Fields Component
function ConditionalFieldsForm() {
  const [formData, setFormData] = React.useState({
    userType: '',
    companyName: '',
    jobTitle: '',
    experience: '',
    skills: [] as string[],
    projectType: '',
    budget: '',
    timeline: ''
  });

  const handleInputChange = (name: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const skillOptions = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'TypeScript', 'GraphQL', 'Docker'];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>I am a...</Label>
        <RadioGroup
          value={formData.userType}
          onValueChange={(value) => handleInputChange('userType', value)}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual">Individual Developer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business">Business/Company</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Show different fields based on user type */}
      {formData.userType === 'business' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Your Job Title</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              placeholder="Enter your job title"
            />
          </div>
        </div>
      )}

      {formData.userType === 'individual' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">0-1 years</SelectItem>
                <SelectItem value="2-5">2-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Technical Skills</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {skillOptions.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={formData.skills.includes(skill)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleInputChange('skills', [...formData.skills, skill]);
                      } else {
                        handleInputChange('skills', formData.skills.filter(s => s !== skill));
                      }
                    }}
                  />
                  <Label htmlFor={skill} className="text-sm">{skill}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Show project fields for both types */}
      {formData.userType && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type</Label>
            <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-app">Web Application</SelectItem>
                <SelectItem value="mobile-app">Mobile Application</SelectItem>
                <SelectItem value="ecommerce">E-commerce Site</SelectItem>
                <SelectItem value="api">API Development</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Show budget field only for business */}
          {formData.userType === 'business' && (
            <div className="space-y-2">
              <Label htmlFor="budget">Project Budget</Label>
              <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k+">$50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="timeline">Project Timeline</Label>
            <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                <SelectItem value="1month">1 month</SelectItem>
                <SelectItem value="2-3months">2-3 months</SelectItem>
                <SelectItem value="6months+">6 months+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Show summary */}
      {formData.userType && (
        <div className="border rounded-lg p-4 bg-muted/50">
          <h4 className="font-medium mb-2">Form Summary</h4>
          <pre className="text-sm">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function FormsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Forms</h1>
            <p className="text-muted-foreground text-lg">
              Advanced form components with validation, conditional fields, and complex layouts
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">8 Form Types</Badge>
            <Badge variant="outline">Validation</Badge>
            <Badge variant="outline">Conditional Fields</Badge>
          </div>
        </div>

        {/* Contact Form with Validation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Mail className="h-5 w-5" />
              Contact Form with Validation
            </CardTitle>
            <CardDescription>
              Complete contact form with real-time validation, error handling, and submission states
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        {/* Dynamic Form Builder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Settings className="h-5 w-5" />
              Dynamic Form Builder
            </CardTitle>
            <CardDescription>
              Build forms dynamically by adding and removing fields with different input types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DynamicFormBuilder />
          </CardContent>
        </Card>

        {/* Conditional Fields Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.GitBranch className="h-5 w-5" />
              Conditional Fields
            </CardTitle>
            <CardDescription>
              Form with conditional logic that shows/hides fields based on user input
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConditionalFieldsForm />
          </CardContent>
        </Card>

        {/* Form Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Layers className="h-5 w-5" />
              Form Patterns & Best Practices
            </CardTitle>
            <CardDescription>
              Common form patterns and validation techniques for better user experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: LucideIcons.CheckCircle, title: 'Real-time Validation', description: 'Validate fields as users type for immediate feedback' },
                { icon: LucideIcons.AlertTriangle, title: 'Error Handling', description: 'Clear error messages with helpful suggestions' },
                { icon: LucideIcons.Save, title: 'Auto-save', description: 'Automatically save form progress to prevent data loss' },
                { icon: LucideIcons.Eye, title: 'Password Visibility', description: 'Toggle password visibility for better usability' },
                { icon: LucideIcons.Upload, title: 'File Upload', description: 'Drag and drop file upload with progress indicators' },
                { icon: LucideIcons.Calculator, title: 'Field Dependencies', description: 'Update fields based on other field values' },
              ].map((pattern, index) => {
                const Icon = pattern.icon;
                return (
                  <div key={index} className="text-center space-y-3 p-4 border rounded-lg">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">{pattern.title}</h4>
                    <p className="text-sm text-muted-foreground">{pattern.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Components Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Grid3X3 className="h-5 w-5" />
              Available Form Components
            </CardTitle>
            <CardDescription>
              Complete collection of form components available in the library
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Input', icon: LucideIcons.Type },
                { name: 'Textarea', icon: LucideIcons.FileText },
                { name: 'Select', icon: LucideIcons.ChevronDown },
                { name: 'Checkbox', icon: LucideIcons.CheckSquare },
                { name: 'Radio Group', icon: LucideIcons.Circle },
                { name: 'Switch', icon: LucideIcons.ToggleLeft },
                { name: 'Date Picker', icon: LucideIcons.Calendar },
                { name: 'File Upload', icon: LucideIcons.Upload },
                { name: 'Color Picker', icon: LucideIcons.Palette },
                { name: 'Slider', icon: LucideIcons.SlidersHorizontal },
                { name: 'OTP Input', icon: LucideIcons.Hash },
                { name: 'Password Input', icon: LucideIcons.Lock },
              ].map((component, index) => {
                const Icon = component.icon;
                return (
                  <div key={index} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium">{component.name}</p>
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