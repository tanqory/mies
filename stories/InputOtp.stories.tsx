import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../src/components/ui/input-otp';
import { Label } from '../src/components/ui/label';
import { Button } from '../src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/components/ui/card';

const meta: Meta<typeof InputOTP> = {
  title: 'Components/InputOTP',
  component: InputOTP,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible one-time password component with customizable length and validation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Maximum number of characters',
    },
    value: {
      control: 'text',
      description: 'The controlled value of the OTP input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="otp">One-Time Password</Label>
      <InputOTP maxLength={6} id="otp">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic 6-digit OTP input.',
      },
    },
  },
};

export const WithSeparator: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="otp-separator">Enter verification code</Label>
      <InputOTP maxLength={6} id="otp-separator">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'OTP input with separator between groups of digits.',
      },
    },
  },
};

export const FourDigit: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="pin">PIN Code</Label>
      <InputOTP maxLength={4} id="pin">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">
        Enter your 4-digit PIN
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '4-digit PIN input for secure access.',
      },
    },
  },
};

export const EightDigit: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="backup-code">Backup Code</Label>
      <InputOTP maxLength={8} id="backup-code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">
        Enter your 8-digit backup recovery code
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '8-digit backup code input with separator.',
      },
    },
  },
};

export const ControlledState: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Verification Code</Label>
          <InputOTP
            maxLength={6}
            value={value}
            onChange={setValue}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">
            Current value: <span className="font-mono">{value || 'Empty'}</span>
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            Length: {value.length}/6
          </div>
          <Button
            onClick={() => setValue('')}
            variant="outline"
            size="sm"
          >
            Clear
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled OTP input showing current value and length.',
      },
    },
  },
};

export const TwoFactorAuth: Story = {
  render: () => {
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleVerify = async () => {
      if (code.length !== 6) return;

      setIsVerifying(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsVerified(true);
      setIsVerifying(false);
    };

    const handleReset = () => {
      setCode('');
      setIsVerified(false);
    };

    return (
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              disabled={isVerified}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {isVerified ? (
            <div className="text-center space-y-4">
              <div className="text-green-600 font-medium">
                ✓ Authentication successful!
              </div>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button
                onClick={handleVerify}
                disabled={code.length !== 6 || isVerifying}
                className="w-full"
              >
                {isVerifying ? 'Verifying...' : 'Verify Code'}
              </Button>
              <div className="text-center">
                <button className="text-sm text-muted-foreground hover:text-foreground">
                  Didn't receive a code? Resend
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete 2FA verification flow with OTP input.',
      },
    },
  },
};

export const PhoneVerification: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // Simulate countdown timer
    React.useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer(prev => {
            if (prev <= 1) {
              setCanResend(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [timer]);

    const handleResend = () => {
      setTimer(60);
      setCanResend(false);
      setOtp('');
    };

    return (
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle>Verify Your Phone</CardTitle>
          <CardDescription>
            We've sent a verification code to<br />
            <strong>+1 (555) 123-4567</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Verification Code</Label>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            className="w-full"
            disabled={otp.length !== 6}
          >
            Verify Phone Number
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?
            </p>
            {canResend ? (
              <Button variant="link" onClick={handleResend} className="p-0">
                Resend code
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend in {timer}s
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Phone verification with OTP and resend functionality.',
      },
    },
  },
};

export const EmailVerification: Story = {
  render: () => {
    const [code, setCode] = useState('');

    return (
      <div className="w-[450px] text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Check your email</h2>
          <p className="text-muted-foreground">
            We sent a verification code to <strong>john@example.com</strong>
          </p>
        </div>

        <div className="space-y-4">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            size="lg"
            className="w-full"
            disabled={code.length !== 6}
          >
            Verify Email
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>The code expires in 10 minutes.</p>
          <div>
            <span>Didn't receive the code? </span>
            <button className="text-primary hover:underline">
              Click to resend
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Email verification screen with OTP input.',
      },
    },
  },
};