import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media Kit — Moonsmoke Network',
  description:
    'Access the Moonsmoke Network media kit including logos, brand guidelines, and press resources.',
};

export default function MediaKitPage() {
  redirect('https://aiproductivityhub.co/media-kit');
}
