// Fix: Add definitions for the Web Speech API to resolve 'Cannot find name 'SpeechRecognition'' errors.
// Fix: Exported SpeechRecognition-related interfaces to make them accessible across modules.
export interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

export interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
}

export interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: (event: Event) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
}

export interface SpeechRecognitionStatic {
    new (): SpeechRecognition;
}


// Make SpeechRecognition types available on the window object
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

export enum Sender {
  User = 'user',
  Bot = 'bot',
  System = 'system',
}

export interface DiseaseAnalysis {
  confidence: string;
  prediction: string;
  probabilities: Record<string, string>;
}

export interface Message {
  id: string;
  sender: Sender;
  text?: string;
  image?: string;
  analysis?: {
    prediction: string;
    confidence: string;
    probabilities: Record<string, string>;
  };
}

// Add this new interface
export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
}