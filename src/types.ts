/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: "core" | "interface" | "intelligence";
  liveValue?: string;
  status?: "Active" | "Beta" | "Experimental";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  comment: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SystemStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface SoundSettings {
  muted: boolean;
  volume: number;
}
