import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import Sidebar from '../pages/AgentDashboard/Sidebar'
import NotificationIcon from '../assets/images/admindashboard/notification.png'
import HelpIcon from '../assets/images/admindashboard/help-1.png'
import ProfilePic from '../assets/images/admindashboard/profile.jpg'
import KYCadd from '../components/KYCadd'
const pathLabelMap = {
	'/agent-dashboard': 'Dashboard',
	'/agent-dashboard/analytics': 'Analytics',
	'/agent-dashboard/packages': 'Packages',
	'/agent-dashboard/support': 'Support Ticketing',
	'/agent-dashboard/agentsettings': 'Settings',
}

const AgentDashboardLayout = () => {
	const location = useLocation()
	const currentPath = location.pathname
	const activeItem = pathLabelMap[currentPath] || 'Dashboard'

	const [isAddKYC, setisAddKYC] = useState(false)

	useEffect(() => {
		const addedKYC = JSON.parse(localStorage.getItem('isAddKYC'))
		setisAddKYC(addedKYC)
	}, [])

	return (
		<div className='flex min-h-screen bg-neutral-100 overflow-x-hidden'>
			<Sidebar />
			{!isAddKYC ? (
				<KYCadd setisAddKYC={setisAddKYC} />
			) : (
				<div className='w-full flex-1 overflow-x-hidden'>
					{/* Desktop Header */}
					<div className='w-full px-6 py-4 hidden sm:flex'>
						<div className='flex justify-between items-start w-full relative'>
							{/* Left: Title + Search + Icons */}
							<div className='flex items-center gap-6'>
								<div className='flex flex-col'>
									<p className='text-[20px] font-semibold'>
										{activeItem}
									</p>
								</div>

								<input
									type='text'
									placeholder='🔍 Search here...'
									className='w-full max-w-[484px] h-[41px] px-4 py-2 rounded-md bg-gray-200 text-sm outline-none'
								/>

								<div className='flex items-center gap-4 ml-4'>
									<img
										src={NotificationIcon}
										alt='Notification'
										className='w-[32px] h-[32px]'
									/>
									<img
										src={HelpIcon}
										alt='Help'
										className='w-[32px] h-[32px]'
									/>
								</div>
							</div>

							{/* Right: Profile */}
							<div className='mr-16'>
								<div className='flex items-center gap-2 border px-3 py-[6px] rounded-md shadow-sm bg-white min-w-[160px]'>
									<img
										src={ProfilePic}
										alt='Profile'
										className='w-8 h-8 rounded-full object-cover'
									/>
									<div className='text-sm leading-tight'>
										<p className='font-medium leading-none'>
											John brevis
										</p>
										<p className='text-gray-400 text-xs leading-none mt-[2px]'>
											Admin
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Mobile Header (only John brevis at top-right) */}
					<div className='sm:hidden w-full flex justify-end px-4 py-3 bg-white shadow-sm'>
						<div className='flex items-center gap-2 border px-3 py-[6px] rounded-md shadow-sm bg-white min-w-[160px]'>
							<img
								src={ProfilePic}
								alt='Profile'
								className='w-8 h-8 rounded-full object-cover'
							/>
							<div className='text-sm leading-tight'>
								<p className='font-medium leading-none'>
									John brevis
								</p>
								<p className='text-gray-400 text-xs leading-none mt-[2px]'>
									Admin
								</p>
							</div>
						</div>
					</div>

					{/* Page Content */}
					<div className='p-6'>
						<Outlet />
					</div>
				</div>
			)}
		</div>
	)
}

export default AgentDashboardLayout
