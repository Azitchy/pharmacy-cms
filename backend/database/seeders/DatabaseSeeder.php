<?php

namespace Database\Seeders;

use App\Models\SiteSection;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@medicashop.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password123'),
                'is_admin' => true,
                'api_token_hash' => null,
                'api_token_expires_at' => null,
            ]
        );

        foreach ($this->defaultSections() as $section) {
            SiteSection::query()->updateOrCreate(
                ['key' => $section['key']],
                $section
            );
        }
    }

    protected function defaultSections(): array
    {
        return [
            [
                'key' => 'header',
                'label' => 'Header',
                'section_type' => 'navigation',
                'description' => 'Brand logo, navigation, and quick actions.',
                'sort_order' => 1,
                'is_active' => true,
                'data' => [
                    'brand' => ['prefix' => 'medica', 'accent' => 'shop'],
                    'navItems' => [
                        ['label' => 'Home', 'path' => '/'],
                        ['label' => 'About us', 'path' => '/about'],
                        ['label' => 'Shop', 'path' => '/shop'],
                        ['label' => 'Contact us', 'path' => '/contact'],
                        ['label' => 'Pages', 'path' => '/pages'],
                    ],
                    'actions' => ['cartCount' => 2],
                ],
            ],
            [
                'key' => 'topbar',
                'label' => 'Top Bar',
                'section_type' => 'banner',
                'description' => 'Announcement strip with support contacts.',
                'sort_order' => 2,
                'is_active' => true,
                'data' => [
                    'items' => [
                        'Discount up to 15% for purchase only this month.',
                        'support@medicashop.com',
                        '+1 202-202-2022',
                    ],
                ],
            ],
            [
                'key' => 'hero',
                'label' => 'Hero Section',
                'section_type' => 'hero',
                'description' => 'Primary introduction banner.',
                'sort_order' => 3,
                'is_active' => true,
                'data' => [
                    'eyebrow' => 'Welcome to medicashop',
                    'title' => 'Our only priority is to keep you healthy.',
                    'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
                    'cta' => 'Discover more',
                ],
            ],
            [
                'key' => 'about',
                'label' => 'About Section',
                'section_type' => 'content',
                'description' => 'About copy, stat cards, and visual panel.',
                'sort_order' => 4,
                'is_active' => true,
                'data' => [
                    'eyebrow' => 'Who we are',
                    'title' => 'With us, expect more than just a pharmacy.',
                    'description' => 'We keep the layout clean and the trust signals visible so the page feels like the reference screenshot without leaning on stock imagery.',
                    'stats' => [
                        ['value' => '14K+', 'label' => 'Happy Customer'],
                        ['value' => '27K+', 'label' => 'Product Sold'],
                        ['value' => '15+', 'label' => 'Years Experience'],
                    ],
                ],
            ],
            [
                'key' => 'featured-products',
                'label' => "Editor's Choice",
                'section_type' => 'catalog',
                'description' => 'Featured products and service assurances.',
                'sort_order' => 5,
                'is_active' => true,
                'data' => [
                    'title' => "Editor's Choice",
                    'products' => [
                        [
                            'name' => 'Health Carbon Filter Mask Color 1 Packs',
                            'price' => '$35.00',
                            'oldPrice' => '$42.00',
                            'badge' => 'Sale',
                            'tone' => 'rose',
                        ],
                        [
                            'name' => 'Advanced Instant Hand Sanitizer with Aloe',
                            'price' => '$13.00',
                            'oldPrice' => '$18.00',
                            'badge' => 'Sale',
                            'tone' => 'mint',
                        ],
                        [
                            'name' => 'Tea Tree Special Shampoo & Scalp Care',
                            'price' => '$23.00',
                            'oldPrice' => '$28.00',
                            'badge' => 'Sale',
                            'tone' => 'teal',
                        ],
                        [
                            'name' => 'Blue Shampoo - Peppermint Rosemary Hair',
                            'price' => '$18.00',
                            'oldPrice' => '$24.00',
                            'badge' => 'Sale',
                            'tone' => 'indigo',
                        ],
                    ],
                    'sidebar' => [
                        [
                            'icon' => '🚚',
                            'title' => 'International Shipping',
                            'description' => 'For select markets, we ship worldwide with clear ETA messaging.',
                        ],
                        [
                            'icon' => '↺',
                            'title' => '30 Days Warranty',
                            'description' => 'Easy returns and replacements are shown as a confidence builder.',
                        ],
                        [
                            'icon' => '▣',
                            'title' => 'Secure Payment',
                            'description' => 'Your orders are protected through secure payment processing.',
                        ],
                    ],
                ],
            ],
            [
                'key' => 'service-banner',
                'label' => 'Service Banner',
                'section_type' => 'banner',
                'description' => 'Large full-width service highlight.',
                'sort_order' => 6,
                'is_active' => true,
                'data' => [
                    'eyebrow' => 'Service highlight',
                    'title' => 'A pharmacy with world-class service.',
                    'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
                    'cta' => 'Discover more',
                ],
            ],
            [
                'key' => 'latest-products',
                'label' => 'Latest Product',
                'section_type' => 'catalog',
                'description' => 'Expanded product grid with more items.',
                'sort_order' => 7,
                'is_active' => true,
                'data' => [
                    'title' => 'Latest Product',
                    'products' => [
                        ['name' => 'Medical Infrared Thermometer Non-Contact', 'price' => '$63.00', 'oldPrice' => '$75.00', 'badge' => 'Sale', 'tone' => 'slate'],
                        ['name' => 'Digital IR Thermometer Forehead Ear', 'price' => '$13.00', 'oldPrice' => '$18.00', 'badge' => 'Sale', 'tone' => 'sky'],
                        ['name' => 'Premium KN95 Health Carbon Filter Mask', 'price' => '$23.00', 'oldPrice' => '$29.00', 'badge' => 'Sale', 'tone' => 'cyan'],
                        ['name' => 'KN95 Health Carbon Filter Mask Color 5 Pack', 'price' => '$19.00', 'oldPrice' => '$27.00', 'badge' => 'Sale', 'tone' => 'blue'],
                        ['name' => 'Health Carbon Filter Mask Color 1 Packs', 'price' => '$35.00', 'oldPrice' => '$42.00', 'badge' => 'Sale', 'tone' => 'rose'],
                        ['name' => 'Advanced Instant Hand Sanitizer with Aloe', 'price' => '$13.00', 'oldPrice' => '$18.00', 'badge' => 'Sale', 'tone' => 'mint'],
                        ['name' => 'Liver Cleanse Detox Colon Formula', 'price' => '$23.00', 'oldPrice' => '$30.00', 'badge' => 'Sale', 'tone' => 'gold'],
                        ['name' => 'Vitamin D3 Capsules for Daily Balance', 'price' => '$9.50', 'oldPrice' => '$12.00', 'badge' => 'Sale', 'tone' => 'violet'],
                        ['name' => 'Hair Wax for Style and Frizz Control', 'price' => '$18.00', 'oldPrice' => '$24.00', 'badge' => 'Sale', 'tone' => 'green'],
                        ['name' => 'Tea Tree Scalp Care Conditioner', 'price' => '$47.00', 'oldPrice' => '$55.00', 'badge' => 'Sale', 'tone' => 'emerald'],
                    ],
                ],
            ],
            [
                'key' => 'promo-grid',
                'label' => 'Promo Grid',
                'section_type' => 'promotion',
                'description' => 'Four promo cards.',
                'sort_order' => 8,
                'is_active' => true,
                'data' => [
                    'cards' => [
                        ['title' => 'Save up to $15 on select Digital Thermometers', 'label' => 'Promo', 'cta' => 'Shop now', 'tone' => 'blue'],
                        ['title' => 'N95 Face Mask', 'label' => 'Protective gear', 'cta' => 'Shop now', 'tone' => 'sand'],
                        ['title' => 'Daily Routine for Good Health', 'label' => 'Wellness', 'cta' => 'Shop now', 'tone' => 'linen'],
                        ['title' => 'Natural Anti-age skin foam', 'label' => 'Skincare', 'cta' => 'Shop now', 'tone' => 'sage'],
                    ],
                ],
            ],
            [
                'key' => 'why-choose',
                'label' => 'Why Choose Us',
                'section_type' => 'feature',
                'description' => 'Reason cards and illustration area.',
                'sort_order' => 9,
                'is_active' => true,
                'data' => [
                    'eyebrow' => 'Why choose us',
                    'title' => 'Best services available for the best customers',
                    'services' => [
                        ['title' => 'Honesty & transparency', 'description' => 'We keep every product, price, and policy straightforward so the experience feels calm and trustworthy.'],
                        ['title' => 'Extra discount', 'description' => 'Seasonal deals and bundle pricing are highlighted clearly to keep the shopping journey simple.'],
                        ['title' => '24/7 Premium Support', 'description' => 'Our support team is displayed as always available to mirror the service-first feel in the reference design.'],
                    ],
                ],
            ],
            [
                'key' => 'brand-strip',
                'label' => 'Brand Strip',
                'section_type' => 'logos',
                'description' => 'Partner logos row.',
                'sort_order' => 10,
                'is_active' => true,
                'data' => [
                    'logos' => ['LOGO', 'logosum', 'L O G O', 'logipsum', 'logoipsum', 'LOGOPSUM'],
                ],
            ],
            [
                'key' => 'testimonials',
                'label' => 'Testimonials',
                'section_type' => 'social-proof',
                'description' => 'Testimonial cards.',
                'sort_order' => 11,
                'is_active' => true,
                'data' => [
                    'eyebrow' => 'Testimonial',
                    'title' => 'What they say about us',
                    'description' => 'We use dummy testimonials to keep the visual weight and spacing aligned with the reference.',
                    'testimonials' => [
                        ['quote' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.', 'name' => 'Harvey Powell', 'role' => 'Customer'],
                        ['quote' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.', 'name' => 'Maria Collins', 'role' => 'Customer'],
                        ['quote' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.', 'name' => 'Lisa Reynolds', 'role' => 'Customer'],
                    ],
                ],
            ],
            [
                'key' => 'newsletter',
                'label' => 'Newsletter',
                'section_type' => 'form',
                'description' => 'Email signup block.',
                'sort_order' => 12,
                'is_active' => true,
                'data' => [
                    'title' => 'Signup our newsletter to get update information, news, insight or promotions.',
                    'button' => 'Sign Up',
                ],
            ],
            [
                'key' => 'footer',
                'label' => 'Footer',
                'section_type' => 'footer',
                'description' => 'Links and contact details.',
                'sort_order' => 13,
                'is_active' => true,
                'data' => [
                    'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
                    'companyLinks' => ['About us', 'Leadership', 'Careers', 'News & Media', 'Legal notices'],
                    'supportLinks' => ['Help center', 'FAQ', 'Contact support', 'Tutorials', 'Track order'],
                    'contact' => [
                        'address' => 'Jn. Complex, Ward No. 22',
                        'city' => 'Kathmandu, Nepal',
                        'phone' => '+1 202-202-2022',
                        'email' => 'support@medicashop.com',
                    ],
                    'socials' => ['f', 't', 'i', 'y'],
                ],
            ],
        ];
    }
}

