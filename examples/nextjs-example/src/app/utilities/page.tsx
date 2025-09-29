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
  Alert,
  AlertDescription,
  Progress,
  Separator,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';

// Color Palette Generator Component
function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = React.useState('#3b82f6');
  const [palette, setPalette] = React.useState<string[]>([]);

  const generatePalette = () => {
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;

      let h = 0;
      if (diff) {
        if (max === r) h = (g - b) / diff + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / diff + 2;
        else h = (r - g) / diff + 4;
      }
      h /= 6;

      const l = (max + min) / 2;
      const s = diff ? (l > 0.5 ? diff / (2 - max - min) : diff / (max + min)) : 0;

      return [h * 360, s * 100, l * 100];
    };

    const hslToHex = (h: number, s: number, l: number) => {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

    const [h, s, l] = hexToHsl(baseColor);
    const colors = [
      hslToHex(h, s, Math.max(l - 40, 10)),   // Darker
      hslToHex(h, s, Math.max(l - 20, 20)),   // Dark
      baseColor,                              // Base
      hslToHex(h, s, Math.min(l + 20, 80)),   // Light
      hslToHex(h, s, Math.min(l + 40, 90)),   // Lighter
    ];

    setPalette(colors);
  };

  React.useEffect(() => {
    generatePalette();
  }, [baseColor]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="baseColor">Base Color</Label>
          <div className="flex gap-2">
            <Input
              id="baseColor"
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-16 h-10"
            />
            <Input
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              placeholder="#3b82f6"
              className="w-32"
            />
          </div>
        </div>
        <Button onClick={generatePalette}>
          <LucideIcons.Shuffle className="h-4 w-4 mr-2" />
          Generate
        </Button>
      </div>

      {palette.length > 0 && (
        <div className="grid grid-cols-5 gap-4">
          {palette.map((color, index) => (
            <div key={index} className="space-y-2">
              <div
                className="w-full h-20 rounded-lg border cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => navigator.clipboard.writeText(color)}
                title="Click to copy"
              />
              <p className="text-sm font-mono text-center">{color}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Lorem Ipsum Generator Component
function LoremIpsumGenerator() {
  const [wordCount, setWordCount] = React.useState(50);
  const [paragraphCount, setParagraphCount] = React.useState(3);
  const [generatedText, setGeneratedText] = React.useState('');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateText = () => {
    const paragraphs = [];

    for (let p = 0; p < paragraphCount; p++) {
      const words = [];
      const wordsPerParagraph = Math.floor(wordCount / paragraphCount);

      for (let w = 0; w < wordsPerParagraph; w++) {
        const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
        words.push(randomWord);
      }

      let paragraph = words.join(' ');
      paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1) + '.';
      paragraphs.push(paragraph);
    }

    setGeneratedText(paragraphs.join('\n\n'));
  };

  React.useEffect(() => {
    generateText();
  }, [wordCount, paragraphCount]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="wordCount">Word Count</Label>
          <Input
            id="wordCount"
            type="number"
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
            min="10"
            max="1000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="paragraphCount">Paragraphs</Label>
          <Input
            id="paragraphCount"
            type="number"
            value={paragraphCount}
            onChange={(e) => setParagraphCount(Number(e.target.value))}
            min="1"
            max="10"
          />
        </div>
        <div className="flex items-end">
          <Button onClick={generateText} className="w-full">
            <LucideIcons.RefreshCw className="h-4 w-4 mr-2" />
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Generated Text</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(generatedText)}
          >
            <LucideIcons.Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        <Textarea
          value={generatedText}
          readOnly
          className="min-h-[200px]"
          placeholder="Generated lorem ipsum text will appear here..."
        />
      </div>
    </div>
  );
}

// QR Code Generator Component
function QRCodeGenerator() {
  const [text, setText] = React.useState('https://example.com');
  const [qrCodeSVG, setQrCodeSVG] = React.useState('');

  const generateQRCode = () => {
    // Simple QR code placeholder (in real app, use a QR library like qrcode)
    const size = 200;
    const modules = 25;
    const moduleSize = size / modules;

    // Generate a simple pattern (not a real QR code)
    const pattern = Array.from({ length: modules }, (_, i) =>
      Array.from({ length: modules }, (_, j) =>
        Math.random() > 0.5 ? 1 : 0
      )
    );

    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="${size}" height="${size}" fill="white"/>`;

    for (let i = 0; i < modules; i++) {
      for (let j = 0; j < modules; j++) {
        if (pattern[i][j]) {
          svg += `<rect x="${j * moduleSize}" y="${i * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="black"/>`;
        }
      }
    }

    svg += '</svg>';
    setQrCodeSVG(svg);
  };

  React.useEffect(() => {
    generateQRCode();
  }, [text]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="qrText">Text or URL</Label>
        <div className="flex gap-2">
          <Input
            id="qrText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL to encode"
            className="flex-1"
          />
          <Button onClick={generateQRCode}>
            <LucideIcons.QrCode className="h-4 w-4 mr-2" />
            Generate
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="p-4 bg-white rounded-lg border">
          <div dangerouslySetInnerHTML={{ __html: qrCodeSVG }} />
        </div>
      </div>

      <Alert>
        <LucideIcons.Info className="h-4 w-4" />
        <AlertDescription>
          This is a demonstration QR code generator. In a real application, use a proper QR code library for accurate encoding.
        </AlertDescription>
      </Alert>
    </div>
  );
}

// Base64 Encoder/Decoder Component
function Base64Converter() {
  const [inputText, setInputText] = React.useState('');
  const [outputText, setOutputText] = React.useState('');
  const [mode, setMode] = React.useState<'encode' | 'decode'>('encode');
  const [error, setError] = React.useState('');

  const convert = () => {
    setError('');
    try {
      if (mode === 'encode') {
        const encoded = btoa(inputText);
        setOutputText(encoded);
      } else {
        const decoded = atob(inputText);
        setOutputText(decoded);
      }
    } catch (err) {
      setError('Invalid input for decoding');
      setOutputText('');
    }
  };

  React.useEffect(() => {
    if (inputText) {
      convert();
    } else {
      setOutputText('');
      setError('');
    }
  }, [inputText, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={mode === 'encode' ? 'default' : 'outline'}
          onClick={() => setMode('encode')}
        >
          Encode
        </Button>
        <Button
          variant={mode === 'decode' ? 'default' : 'outline'}
          onClick={() => setMode('decode')}
        >
          Decode
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="input">
          {mode === 'encode' ? 'Plain Text' : 'Base64 Encoded Text'}
        </Label>
        <Textarea
          id="input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 text to decode...'}
          rows={4}
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <LucideIcons.AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="output">
            {mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'}
          </Label>
          {outputText && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(outputText)}
            >
              <LucideIcons.Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          )}
        </div>
        <Textarea
          id="output"
          value={outputText}
          readOnly
          rows={4}
          placeholder="Result will appear here..."
        />
      </div>
    </div>
  );
}

// Password Generator Component
function PasswordGenerator() {
  const [length, setLength] = React.useState(12);
  const [includeUppercase, setIncludeUppercase] = React.useState(true);
  const [includeLowercase, setIncludeLowercase] = React.useState(true);
  const [includeNumbers, setIncludeNumbers] = React.useState(true);
  const [includeSymbols, setIncludeSymbols] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [strength, setStrength] = React.useState(0);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) return;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(result);

    // Calculate strength
    let score = 0;
    if (length >= 8) score += 25;
    if (length >= 12) score += 25;
    if (includeUppercase && includeLowercase) score += 20;
    if (includeNumbers) score += 15;
    if (includeSymbols) score += 15;

    setStrength(Math.min(score, 100));
  };

  React.useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const getStrengthColor = () => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="length">Password Length: {length}</Label>
        <input
          id="length"
          type="range"
          min="4"
          max="50"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="uppercase"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="lowercase"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          <Label htmlFor="lowercase">Lowercase (a-z)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="numbers"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <Label htmlFor="numbers">Numbers (0-9)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="symbols"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          <Label htmlFor="symbols">Symbols (!@#$...)</Label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Generated Password</Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(password)}
            >
              <LucideIcons.Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={generatePassword}>
              <LucideIcons.RefreshCw className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>
        <Input value={password} readOnly className="font-mono" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Password Strength</Label>
          <span className="text-sm font-medium">{getStrengthText()}</span>
        </div>
        <Progress value={strength} className="w-full" />
      </div>
    </div>
  );
}

// JSON Formatter Component
function JSONFormatter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('');

  const formatJSON = () => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      setError('Invalid JSON format');
      setOutput('');
    }
  };

  const minifyJSON = () => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setError('Invalid JSON format');
      setOutput('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="jsonInput">JSON Input</Label>
        <Textarea
          id="jsonInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value", "array": [1, 2, 3]}'
          rows={6}
          className="font-mono"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={formatJSON}>
          <LucideIcons.AlignLeft className="h-4 w-4 mr-2" />
          Format
        </Button>
        <Button onClick={minifyJSON} variant="outline">
          <LucideIcons.Minimize2 className="h-4 w-4 mr-2" />
          Minify
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <LucideIcons.AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="jsonOutput">Formatted JSON</Label>
          {output && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(output)}
            >
              <LucideIcons.Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          )}
        </div>
        <Textarea
          id="jsonOutput"
          value={output}
          readOnly
          rows={6}
          className="font-mono"
          placeholder="Formatted JSON will appear here..."
        />
      </div>
    </div>
  );
}

export default function UtilitiesPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Utilities</h1>
            <p className="text-muted-foreground text-lg">
              Helper components, utility functions, and development tools
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">12 Utilities</Badge>
            <Badge variant="outline">Developer Tools</Badge>
            <Badge variant="outline">Generators</Badge>
          </div>
        </div>

        {/* Color Palette Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Palette className="h-5 w-5" />
              Color Palette Generator
            </CardTitle>
            <CardDescription>
              Generate harmonious color palettes from a base color
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ColorPaletteGenerator />
          </CardContent>
        </Card>

        {/* Lorem Ipsum Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.FileText className="h-5 w-5" />
              Lorem Ipsum Generator
            </CardTitle>
            <CardDescription>
              Generate placeholder text for your designs and prototypes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoremIpsumGenerator />
          </CardContent>
        </Card>

        {/* QR Code Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.QrCode className="h-5 w-5" />
              QR Code Generator
            </CardTitle>
            <CardDescription>
              Generate QR codes for URLs, text, or other data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QRCodeGenerator />
          </CardContent>
        </Card>

        {/* Base64 Converter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Code className="h-5 w-5" />
              Base64 Encoder/Decoder
            </CardTitle>
            <CardDescription>
              Encode and decode text to/from Base64 format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Base64Converter />
          </CardContent>
        </Card>

        {/* Password Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Key className="h-5 w-5" />
              Password Generator
            </CardTitle>
            <CardDescription>
              Generate secure passwords with customizable options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordGenerator />
          </CardContent>
        </Card>

        {/* JSON Formatter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Braces className="h-5 w-5" />
              JSON Formatter
            </CardTitle>
            <CardDescription>
              Format and minify JSON data for better readability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JSONFormatter />
          </CardContent>
        </Card>

        {/* Developer Tools Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Wrench className="h-5 w-5" />
              Developer Tools
            </CardTitle>
            <CardDescription>
              Additional utilities and tools for developers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: LucideIcons.Hash, title: 'Hash Generator', description: 'Generate MD5, SHA1, SHA256 hashes' },
                { icon: LucideIcons.Ruler, title: 'Unit Converter', description: 'Convert between different units' },
                { icon: LucideIcons.Clock, title: 'Timestamp Converter', description: 'Unix timestamp conversion tools' },
                { icon: LucideIcons.Zap, title: 'URL Shortener', description: 'Create short URLs for sharing' },
                { icon: LucideIcons.Image, title: 'Image Optimizer', description: 'Compress and optimize images' },
                { icon: LucideIcons.FileCode, title: 'Code Minifier', description: 'Minify CSS, JS, and HTML code' },
              ].map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div key={index} className="text-center space-y-3 p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">{tool.title}</h4>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Utility Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Grid3X3 className="h-5 w-5" />
              Utility Categories
            </CardTitle>
            <CardDescription>
              Browse utilities by category to find what you need
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Text Tools', count: 8, icon: LucideIcons.Type },
                { name: 'Color Tools', count: 5, icon: LucideIcons.Palette },
                { name: 'Code Tools', count: 12, icon: LucideIcons.Code },
                { name: 'Image Tools', count: 6, icon: LucideIcons.Image },
                { name: 'Data Tools', count: 9, icon: LucideIcons.Database },
                { name: 'Security Tools', count: 4, icon: LucideIcons.Shield },
                { name: 'Network Tools', count: 7, icon: LucideIcons.Wifi },
                { name: 'File Tools', count: 10, icon: LucideIcons.File },
              ].map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={index} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.count} tools</p>
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