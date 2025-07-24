import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Icons
import dashboardIcon from '../../assets/images/admindashboard/dashboard.png'
import AnalyticsIcon from '../../assets/images/admindashboard/analytics.png'
import discount from '../../assets/images/admindashboard/discount.png'
import support from '../../assets/images/admindashboard/support.png'
import SettingsIcon from '../../assets/images/admindashboard/settings.png'
import LogoutIcon from '../../assets/images/admindashboard/logout.png'
import WeeFlyLogo from '../../assets/images/admindashboard/weefly.png'
import DefaultAgentLogo from '../../assets/images/agentdashboard/agent-logo.png' // adjust the path as needed
import { LayoutGrid, User } from 'lucide-react'
const agent = {
	logo: null,
}

const navItems = [
	{ label: 'Dashboard', icon: dashboardIcon, path: '/agent-dashboard' },
	{
		label: 'Analytics',
		icon: AnalyticsIcon,
		path: '/agent-dashboard/analytics',
	},
	{
		label: 'Packages',
		icon: discount,
		path: '/agent-dashboard/agentPackages',
	},
	{
		label: 'CRM',
		icon: support,
		path: '/agent-dashboard/crm',
	},
	{
		label: 'Support Ticketing',
		icon: support,
		path: '/agent-dashboard/supportTicket',
	},
	{
		label: 'Settings',
		icon: SettingsIcon,
		path: '/agent-dashboard/agentsettings',
	},
	{ label: 'Logout', icon: LogoutIcon, path: '/login' },
]

export default function Sidebar() {
	const navigate = useNavigate()
	const location = useLocation()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	// Check if screen is mobile
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768)
		}

		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)

		return () => window.removeEventListener('resize', checkScreenSize)
	}, [])

	// Close mobile menu when route changes
	useEffect(() => {
		setIsMobileMenuOpen(false)
	}, [location.pathname])

	// Handle mobile menu toggle
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	// Handle navigation click
	const handleNavClick = path => {
		navigate(path)
		if (isMobile) {
			setIsMobileMenuOpen(false)
		}
	}

	// Hamburger Menu Component
	const HamburgerButton = () => (
		<button
			onClick={toggleMobileMenu}
			className='md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md'
			aria-label='Toggle menu'>
			<div className='w-6 h-6 flex flex-col justify-center items-center'>
				<span
					className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
						isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
					}`}
				/>
				<span
					className={`block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${
						isMobileMenuOpen ? 'opacity-0' : ''
					}`}
				/>
				<span
					className={`block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${
						isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
					}`}
				/>
			</div>
		</button>
	)

	// Mobile Overlay
	const MobileOverlay = () => (
		<div
			className={`md:hidden fixed inset-0 backdrop-blur-sm z-30 transition-all duration-300 ${
				isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
			}`}
			onClick={() => setIsMobileMenuOpen(false)}
		/>
	)

	return (
		<>
			{/* Hamburger Button */}
			<HamburgerButton />

			{/* Mobile Overlay */}
			<MobileOverlay />

			{/* Sidebar */}
			<div
				className={`
        w-[256px] min-h-screen bg-white shadow-md px-[28px] py-6 flex flex-col font-[Lato]
        md:relative md:translate-x-0 md:shadow-md md:min-h-[800px] md:mr-5
        fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:block
      `}>
				{/* Logo */}
				{/* <div className="flex justify-center mb-6 mt-8 md:mt-0">
          {agent.logo ? (
            <img
              src={agent.logo}
              alt="Agent Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20  bg-gray-100 border border-gray-300" />
          )}
        </div> */}
				<div className='flex justify-center mb-6 mt-8 md:mt-0'>
					<img
						src={DefaultAgentLogo}
						alt='Agent Logo'
						className='w-40 h-20 object-contain'
					/>
				</div>

				{/* Navigation */}
				<div className='flex flex-col gap-y-3'>
					{navItems.map(item => (
						<div
							key={item.label}
							onClick={() => handleNavClick(item.path)}
							className={`flex items-center gap-3 w-full h-[40px] px-4 rounded-lg cursor-pointer transition-all duration-200 ${
								location.pathname === item.path
									? 'bg-[#F05A28] text-white font-semibold'
									: 'text-gray-600 hover:bg-orange-100'
							}`}>
							<img
								src={item.icon}
								alt={`${item.label} icon`}
								className='w-5 h-5'
							/>
							<span className='text-[15px]'>{item.label}</span>
						</div>
					))}
				</div>

				{/* Switch Button */}
				<div className='mt-4'>
					<button
						onClick={() => {
							navigate('/profile')
						}}
						className='w-full bg-white text-black border border-gray-200 text-sm font-semibold py-2 rounded-md hover:bg-[#F05A28]/10 transition'>
						Switch To User
					</button>
				</div>

				{/* Swiper Promo */}
				<div className='mt-[100px] flex flex-col items-center'>
					<hr className='w-[70%] mx-auto border-t border-gray-300 mb-8' />

					<Swiper
						pagination={{
							el: '.custom-pagination',
							clickable: true,
							renderBullet: (index, className) =>
								`<span class="${className} w-2 h-2 rounded-full inline-block mx-1"></span>`,
						}}
						spaceBetween={12}
						modules={[Pagination]}
						className='w-[208px] h-[252px]'>
						{Array.from({ length: 5 }).map((_, index) => (
							<SwiperSlide key={index}>
								<div className='bg-[#F05A28] text-white rounded-xl px-4 py-4 h-full'>
									<div className='text-[11px] font-medium'>
										Save Huge with
									</div>
									<div className='text-lg font-bold mb-1 leading-snug'>
										British Airways
									</div>
									<p className='text-[11px] leading-snug mb-3'>
										Book Flights from India to the UK with
										British Airways & Enjoy Up to INR 2500
										OFF
									</p>
									<div className='bg-white text-[#F05A28] text-xs font-semibold px-3 py-[5px] rounded-full inline-flex items-center gap-1'>
										WEEFLY247
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='w-3 h-3'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M13 7h8m0 0v8m0-8L9 21'
											/>
										</svg>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Pagination Dots */}
					<div className='custom-pagination mt-4 text-center'></div>

					{/* Footer with Local Logo */}
					<div className='pt-4 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1'>
						Powered by{' '}
						<img
							src={WeeFlyLogo}
							alt='WeeFly Logo'
							className='h-[25px] object-contain ml-[4px]'
						/>
					</div>
				</div>

				{/* Custom Pagination Dot Styling */}
				<style>
					{`
            .swiper-pagination-bullet {
              background-color: #D9D9D9;
              opacity: 1;
            }
            .swiper-pagination-bullet-active {
              background-color: #F05A28;
            }
          `}
				</style>
			</div>
		</>
	)
}
