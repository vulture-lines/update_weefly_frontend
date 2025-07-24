import React, { useState, useEffect } from 'react'

import IconDelete from '../../assets/images/agentdashboard/delete.png'
import IconEdit from '../../assets/images/agentdashboard/edit.png'
import IconLogin from '../../assets/images/agentdashboard/history.png'
import Icon2Step from '../../assets/images/agentdashboard/tick.png'
import ProfileImage from '../../assets/images/agentdashboard/Ellipse3539.png'
import { Edit, Pencil, Plus, Trash, Trash2 } from 'lucide-react'
import WorldMap from '../../assets/images/agentdashboard/worldmap.png'
import Sim from '../../assets/images/agentdashboard/sim.png'
import Tick from '../../assets/images/agentdashboard/tick.png'
const SettingsPage = () => {
	const [isBankEdit, setIsBankEdit] = useState(false)
	const [activeTab, setActiveTab] = useState('Account Management')
	const [formData, setFormData] = useState({
		firstName: 'John',
		lastName: 'Brevis',
		email: 'johnbrevis@gmail.com',
		password: '************',
	})

	useEffect(() => {
		document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif"
	}, [])

	const tabs = [
		'Account Management',
		'Billing Info',
		'Commission Preferences',
		'Notification Settings',
		'Regional Preferences',
	]

	const InvoiceData = [
		{
			id: 'INV001023',
			amt: '$125.00',
			date: 'May 15, 2025',
		},
		{
			id: 'INV001023',
			amt: '$125.00',
			date: 'May 15, 2025',
		},
		{
			id: 'INV001023',
			amt: '$125.00',
			date: 'May 15, 2025',
		},
		{
			id: 'INV001023',
			amt: '$125.00',
			date: 'May 15, 2025',
		},
	]

	const [settings, setSettings] = useState({
		bookingAlerts: true,
		flightChangeUpdates: true,
		commissionUpdates: false,
	})

	const toggleSetting = key => {
		setSettings(prev => ({
			...prev,
			[key]: !prev[key],
		}))
	}

	const ToggleSwitch = ({ isOn, onToggle }) => (
		<button
			onClick={onToggle}
			className={`relative inline-flex h-8 w-13 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
				isOn ? 'bg-orange-600/50' : 'bg-gray-300'
			}`}>
			<span
				className={`inline-block h-6 w-6 transform rounded-full  transition-transform duration-200 ease-in-out ${
					isOn
						? 'translate-x-6 bg-orange-600'
						: 'translate-x-1 bg-white'
				}`}
			/>
		</button>
	)

	const NotificationItem = ({
		icon,
		title,
		description,
		isEnabled,
		onToggle,
	}) => (
		<div className='flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm'>
			<div className='flex items-center space-x-3'>
				<div className='flex-shrink-0 mt-1'>
					<div className='w-8 h-8 rounded-lg flex items-center justify-center'>
						{icon}
					</div>
				</div>
				<div className='flex-1 min-w-0'>
					<h3 className='text-base font-bold text-gray-900 mb-1'>
						{title}
					</h3>
					<p className='text-sm text-gray-500 leading-relaxed'>
						{description}
					</p>
				</div>
			</div>
			<div className='flex-shrink-0'>
				<ToggleSwitch isOn={isEnabled} onToggle={onToggle} />
			</div>
		</div>
	)

	const renderTabContent = () => {
		if (activeTab === 'Account Management') {
			return (
				<div className='mt-8'>
					<div className='mb-8 flex items-center'>
						<img
							src={ProfileImage}
							alt='Profile'
							className='w-20 h-20 rounded-full object-cover'
						/>
						<div className='ml-6 text-sm text-gray-600'>
							<span className='text-red-500 font-medium cursor-pointer mr-2'>
								Remove
							</span>
							<span className='text-red-500 font-medium cursor-pointer'>
								Upload
							</span>
							<div className='mt-1'>
								We support PNGs JPEGs and GIFs under 2MB
							</div>
						</div>
					</div>

					<div className='flex gap-[26px] mb-6'>
						<div className='flex-1'>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								First Name
							</label>
							<input
								value={formData.firstName}
								onChange={e =>
									setFormData({
										...formData,
										firstName: e.target.value,
									})
								}
								className='w-full border border-gray-300 rounded px-4 py-2'
								type='text'
							/>
						</div>
						<div className='flex-1'>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Last Name
							</label>
							<input
								value={formData.lastName}
								onChange={e =>
									setFormData({
										...formData,
										lastName: e.target.value,
									})
								}
								className='w-full border border-gray-300 rounded px-4 py-2'
								type='text'
							/>
						</div>
					</div>

					<div className='flex justify-between mb-6 items-start'>
						<div className='w-[466px]'>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Email
							</label>
							<input
								value={formData.email}
								disabled
								className='w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 cursor-not-allowed'
								type='email'
							/>
						</div>
						<div className='ml-[598px] -mt-1'>
							<button className='bg-[#F05A28] w-[145px] h-[36px] text-white text-sm font-medium rounded flex items-center justify-center gap-2'>
								<Pencil size={14} /> Change Email
							</button>
						</div>
					</div>

					<div className='flex justify-between mb-10 items-start'>
						<div className='w-[466px]'>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Password
							</label>
							<input
								value={formData.password}
								disabled
								className='w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 cursor-not-allowed'
								type='password'
							/>
						</div>
						<div className='ml-[598px] -mt-1'>
							<button className='bg-[#F05A28] w-[195px] h-[38px] text-white text-sm font-medium rounded flex items-center justify-center gap-2'>
								<Pencil size={14} /> Change Password
							</button>
						</div>
					</div>

					<hr className='border-t border-gray-200 mb-10 w-full' />

					<div className='flex flex-col gap-8 w-full min-w-[964px]'>
						<div className='flex justify-between items-start'>
							<div className='flex gap-4'>
								<img
									src={IconLogin}
									className='w-5 h-5 mt-1'
									alt='login'
								/>
								<div>
									<div className='font-medium text-sm text-gray-800'>
										Account Details
									</div>
								</div>
							</div>
							<button
								className='bg-[#F05A28] w-[169px] h-[38px] text-white text-sm font-medium rounded flex justify-center items-center gap-1'
								onClick={() => setIsBankEdit(prev => !prev)}>
								<Edit /> {!isBankEdit ? 'Edit' : 'update'}
							</button>
						</div>

						<div className='flex justify-between items-start'>
							<form className='grid grid-cols-2 justify-between w-full gap-8'>
								<div className=''>
									<label className=''>Bank Name</label>
									<input
										type='input'
										disabled={!isBankEdit}
										placeholder='Enter Account Name'
										className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
									/>
								</div>
								<div className=''>
									<label className=''>Account Number</label>
									<input
										disabled={!isBankEdit}
										type={
											!isBankEdit ? 'password' : 'number'
										}
										placeholder='Enter Account Number'
										className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
									/>
								</div>
								<div className=''>
									<label className=''>
										Confirm Account Number
									</label>
									<input
										disabled={!isBankEdit}
										type={
											!isBankEdit ? 'password' : 'number'
										}
										placeholder='Re-enter Account Number'
										className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
									/>
								</div>
								<div className=''>
									<label className=''>Bank Code</label>
									<input
										disabled={!isBankEdit}
										type='number'
										placeholder='ex: xxxxxx'
										className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
									/>
								</div>
							</form>
						</div>

						<div className='flex justify-between items-start'>
							<div className='flex gap-4'>
								<img
									src={Icon2Step}
									className='w-5 h-5 mt-1'
									alt='2-step'
								/>
								<div>
									<div className='font-medium text-sm text-gray-800'>
										2 - Step Verifications
									</div>
									<div className='text-sm text-gray-600'>
										Add an additional layer of security to
										your account during login
									</div>
								</div>
							</div>
						</div>

						<div className='flex justify-between items-start'>
							<div className='flex gap-4'>
								<img
									src={IconLogin}
									className='w-5 h-5 mt-1'
									alt='login'
								/>
								<div>
									<div className='font-medium text-sm text-gray-800'>
										Login History
									</div>
									<div className='text-sm text-gray-600'>
										Last Login: May 10, 2025, 10:49 AM
									</div>
								</div>
							</div>
							<button className='bg-[#F05A28] w-[169px] h-[38px] text-white text-sm font-medium rounded'>
								View Activity Log
							</button>
						</div>

						<div className='flex justify-between items-start'>
							<div className='flex gap-4'>
								<img
									src={IconDelete}
									className='w-5 h-5 mt-1'
									alt='delete'
								/>
								<div>
									<div className='font-medium text-sm text-red-600'>
										Delete My Account
									</div>
									<div className='text-sm text-gray-600'>
										Permanently delete the account and
										remove access
									</div>
								</div>
							</div>
							<button className='bg-[#F05A28] w-[169px] h-[38px] text-white text-sm font-medium rounded'>
								Delete Account
							</button>
						</div>
					</div>
				</div>
			)
		} else if (activeTab === 'Billing Info') {
			return (
				<div className='mt-8'>
					<div className=''>
						<div className='flex items-center justify-between'>
							<p className='text-xl font-semibold'>
								Saved Payment Methods
							</p>
							<span className='flex gap-2'>
								<button className='bg-[#F05A28] w-[145px] h-[36px] text-white text-sm font-medium rounded flex items-center justify-center gap-2'>
									<Edit />
									Edit
								</button>
								<button className='bg-[#F05A28] w-[145px] h-[36px] text-white text-sm font-medium rounded flex items-center justify-center gap-2'>
									<Trash2 />
									Remove
								</button>
							</span>
						</div>

						<div className='my-10 flex items-center gap-8'>
							<div className='w-[308px] h-[195px] rounded-[15px] bg-black relative overflow-hidden'>
								<img
									src={WorldMap}
									alt='worldmap'
									className='scale-125 mt-10 opacity-50'
								/>

								<img
									src={Sim}
									alt='SIM'
									className='absolute top-1/3 left-10'
								/>

								<div className='absolute top-1/2 left-10 text-white mt-1 w-full flex flex-col leading-1'>
									<p className='flex flex-col items-start leading-3'>
										<span className='text-xl'>
											4000 1234 5678 9012
										</span>
										<span className='text-[4px]'>4000</span>
									</p>
									<p className='flex items-center justify-evenly'>
										<span></span>
										<span className='flex items-center gap-1'>
											<span className='text-[4px]'>
												GOOD <br /> THRU
											</span>
											<span>01/30</span>
										</span>
										<span className='flex items-center gap-1'>
											<span className='text-[4px]'>
												CVV <br /> CODE
											</span>
											<span>123</span>
										</span>
									</p>
									<p className='text-lg'>John Brevis</p>
								</div>
							</div>
							<div className='w-[308px] h-[195px] grid place-items-center border-2 border-[#EE5128] rounded-2xl p-[20px] bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:shadow-[#EE5128] hover:bg-[#EE5129] group'>
								<div className='h-[40px] w-[40px] bg-[#EE5128] grid place-items-center rounded-full group-hover:bg-white'>
									<Plus className='h-[20px] w-[20px] text-white group-hover:text-[#EE5128]' />
								</div>
								<p className='text-black text-center group-hover:text-white'>
									Add New <br /> Payment Method
								</p>
							</div>
						</div>

						<div className='mb-10'>
							<div className='flex justify-between items-center'>
								<p className='text-xl font-semibold'>
									Billing Address
								</p>
								<button className='bg-[#F05A28] w-[145px] h-[36px] text-white text-sm font-medium rounded flex items-center justify-center gap-2'>
									<Edit />
									Edit
								</button>
							</div>
							<div className='grid grid-cols-3 gap-8 mt-8'>
								<div className=''>
									<label className=''>Company Name</label>
									<input
										type='input'
										placeholder='Airline company'
										className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
									/>
								</div>
								<div className=''>
									<label className=''>
										Address Line 1 & 2
									</label>
									<input
										type='input'
										placeholder='Enter Address Line 1 & 2'
										className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
									/>
								</div>
								<div className=''>
									<label className=''>City</label>
									<input
										type='input'
										placeholder='Enter City Name'
										className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
									/>
								</div>
								<div className=''>
									<label className=''>State</label>
									<input
										type='input'
										placeholder='Enter State Name'
										className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
									/>
								</div>
								<div className=''>
									<label className=''>Country</label>
									<input
										type='input'
										placeholder='Enter Country Name'
										className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
									/>
								</div>
							</div>
						</div>

						<div className=''>
							<p className='text-xl font-semibold'>
								Billing Address
							</p>
							{/* Table */}
							<table className='table table-fixed w-full mt-6 text-left '>
								<thead className='border-b-2 border-gray-200'>
									<tr>
										<th className='py-5'>Invoice ID</th>
										<th>Amount</th>
										<th>Date</th>

										<th>Download</th>
									</tr>
								</thead>
								<tbody className='overflow-y-hidden h-[80%]'>
									{InvoiceData.map((invoice, index) => (
										<tr key={index} className=''>
											<td className='py-5'>
												{invoice.id}
											</td>

											<td>{invoice.amt}</td>
											<td>{invoice.date}</td>
											<td>
												<button className='text-white bg-[#EE5128] px-8 py-1 rounded-md font-medium'>
													Download PDF
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)
		} else if (activeTab === 'Commission Preferences') {
			return (
				<div className='mt-8'>
					<div className=''>
						<h4 className='text-xl font-semibold'>
							Commission Preferences
						</h4>
						<p className='text-gray-400'>
							Set your preferred commission Handling and payout
							Details
						</p>
					</div>

					<div className='bg-white p-8 flex flex-col gap-2 shadow-2xl mt-10 rounded-2xl'>
						<h4 className='text-xl font-semibold'>
							Commission Model
						</h4>
						<label className='mt-2 flex gap-2 accent-[#F05A28]'>
							<input type='radio' />
							<span>Flat Commission (e.g., $20 per booking)</span>
						</label>
						<label className='flex gap-2 accent-[#F05A28]'>
							<input type='radio' />
							<span>Percentage-Based (e.g., 5% per ticket)</span>
						</label>
					</div>

					<div className='mt-10 flex gap-10 w-full'>
						<div className='p-8 shadow-2xl rounded-2xl w-full bg-white'>
							<h4 className='text-xl font-semibold'>
								Payout Cyclce
							</h4>
							<label className='mt-2 flex gap-2 accent-[#F05A28]'>
								<input type='radio' />
								<span>Weekly</span>
							</label>
							<label className='mt-1 flex gap-2 accent-[#F05A28]'>
								<input type='radio' />
								<span>Biweekly</span>
							</label>
							<label className='mt-1 flex gap-2 accent-[#F05A28]'>
								<input type='radio' />
								<span>Monthly</span>
							</label>
						</div>
						<div className='p-8 shadow-2xl rounded-2xl w-full bg-white'>
							<div className='flex items-center justify-between'>
								<h4 className='text-xl font-semibold'>
									Payment Method
								</h4>
								<button className='bg-[#F05A28] w-[145px] h-[36px] text-white text-sm font-medium rounded flex items-center justify-center gap-2'>
									<Edit />
									Edit
								</button>
							</div>
							<label className='mt-2 flex gap-2 accent-[#F05A28]'>
								<input type='radio' />
								<span>Bank Transfer</span>
							</label>
							<label className='mt-1 flex gap-2 accent-[#F05A28]'>
								<input type='radio' />
								<span>UPI ID</span>
							</label>
							<label className='mt-1 flex gap-2 accent-[#F05A28]'>
								<input type='radio' />
								<span>Paypal / Stipe</span>
							</label>
						</div>
					</div>

					<hr className='bg-[#CCCCCC] my-10' />

					<p className='font-bold text-xl'>
						Next commission payout: June 30, 2025
					</p>
				</div>
			)
		} else if (activeTab === 'Notification Settings') {
			return (
				<div className='mt-10'>
					<div className='space-y-8'>
						<NotificationItem
							icon={<img src={Tick} />}
							title='Booking Alerts'
							description='Receive booking updates via email, SMS, or push notifications based on your preferences.'
							isEnabled={settings.bookingAlerts}
							onToggle={() => toggleSetting('bookingAlerts')}
						/>
						<NotificationItem
							icon={<img src={Tick} />}
							title='Flight Change Updates'
							description='Receive alerts on flight delays, reschedules, or cancellations'
							isEnabled={settings.flightChangeUpdates}
							onToggle={() =>
								toggleSetting('flightChangeUpdates')
							}
						/>
						<NotificationItem
							icon={<img src={Tick} />}
							title='Commission Updates'
							description='Get a weekly commission summary and payout confirmation emails directly to your inbox.'
							isEnabled={settings.commissionUpdates}
							onToggle={() => toggleSetting('commissionUpdates')}
						/>
					</div>
				</div>
			)
		} else if (activeTab === 'Regional Preferences') {
			return (
				<div className='mt-10'>
					<div className=''>
						<button className='bg-[#F05A28] px-6 h-[36px] text-white text-sm font-medium rounded flex items-center justify-center gap-2'>
							Submit your preferences
						</button>
					</div>
				</div>
			)
		}
		return (
			<div className='text-sm text-gray-600 pt-10'>
				{activeTab} content coming soon.
			</div>
		)
	}

	return (
		<div className="w-full px-[112px] pt-[60px] pb-[40px] font-['Plus Jakarta Sans']">
			<div className='flex space-x-10 border-b border-gray-200 mb-[48px]'>
				{tabs.map(tab => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`text-sm font-medium pb-3 h-[44px] ${
							activeTab === tab
								? 'border-b-2 border-[#F05A28] text-black'
								: 'text-gray-500'
						}`}>
						{tab}
					</button>
				))}
			</div>
			{renderTabContent()}
		</div>
	)
}

export default SettingsPage

const ToggleSwitch = ({ isOn, onToggle }) => (
	<button
		onClick={onToggle}
		className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
			isOn ? 'bg-orange-500' : 'bg-gray-300'
		}`}>
		<span
			className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
				isOn ? 'translate-x-6' : 'translate-x-1'
			}`}
		/>
	</button>
)
