import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				/* Brutalist Color System */
				paper: 'hsl(var(--paper))',
				ink: 'hsl(var(--ink))',
				'electric-yellow': 'hsl(var(--electric-yellow))',
				'neon-pink': 'hsl(var(--neon-pink))',
				'cyber-blue': 'hsl(var(--cyber-blue))',
				'danger-red': 'hsl(var(--danger-red))',
				concrete: 'hsl(var(--concrete))',
				steel: 'hsl(var(--steel))',
				ash: 'hsl(var(--ash))',
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			fontFamily: {
				display: ['Playfair Display', 'serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			boxShadow: {
				brutal: 'var(--shadow-brutal)',
				neon: 'var(--shadow-neon)',
			},
			animation: {
				marquee: 'marquee 20s linear infinite',
				'glitch-1': 'glitch-1 0.3s infinite',
				'glitch-2': 'glitch-2 0.3s infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-up': 'slide-up 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
				'fade-in': 'fade-in 0.8s ease-out 0.6s both',
				'now-special': 'now-special 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
				'counter-numbers': 'counter-numbers 3s ease-out forwards',
				'word-reveal': 'word-reveal 0.8s ease-out forwards',
				'morphing': 'morphing 2s ease-in-out forwards',
				'float-up': 'float-up 1s ease-out forwards',
				'emerge-from-void': 'emerge-from-void 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'page-transition': 'page-transition 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'now-special': {
					'0%': {
						transform: 'scale(0.8) translateY(20px)',
						opacity: '0',
						color: 'hsl(var(--primary))'
					},
					'50%': {
						transform: 'scale(1.1) translateY(-5px)',
						opacity: '1',
						color: 'hsl(var(--electric-yellow))'
					},
					'100%': {
						transform: 'scale(1) translateY(0)',
						opacity: '1',
						color: 'hsl(var(--electric-yellow))'
					}
				},
				'progress-tracker': {
					'0%': {
						width: '0%'
					},
					'100%': {
						width: '100%'
					}
				},
				'counter-numbers': {
					'0%': {
						transform: 'translateY(0)'
					},
					'100%': {
						transform: 'translateY(-38400px)'
					}
				},
				'word-reveal': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'morphing': {
					'0%': {
						transform: 'translate(-50%, -50%) scale(1)',
						backgroundColor: 'transparent'
					},
					'100%': {
						transform: 'translate(-50%, -50%) scale(50)',
						backgroundColor: 'black'
					}
				},
				'float-up': {
					'0%': {
						transform: 'translateY(80px) scale(0.8)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0) scale(1)',
						opacity: '1'
					}
				},
				'emerge-from-void': {
					'0%': {
						transform: 'translateY(60px) scale(0.85)',
						opacity: '0',
						filter: 'blur(4px)'
					},
					'100%': {
						transform: 'translateY(0) scale(1)',
						opacity: '1',
						filter: 'blur(0px)'
					}
				},
				'page-transition': {
					'0%': {
						backgroundColor: 'rgba(0, 0, 0, 0.95)',
						opacity: '1'
					},
					'70%': {
						backgroundColor: 'rgba(0, 0, 0, 0.3)',
						opacity: '0.7'
					},
					'100%': {
						backgroundColor: 'transparent',
						opacity: '0'
					}
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
