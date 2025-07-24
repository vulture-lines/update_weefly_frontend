import { Upload } from 'lucide-react'
import React from 'react'

const SupportTicket = () => {
	const TicketData = [
		{
			Id: '#45821',
			subject: 'Booking Failed after payment',
			status: 'Open',
			priority: 'High',
			lastUpdate: 'Jun 28, 2025',
		},
		{
			Id: '#45821',
			subject: 'Commission Not received',
			status: 'In progress',
			priority: 'Medium',
			lastUpdate: 'Jun 28, 2025',
		},
		{
			Id: '#45821',
			subject: 'Need Invoice copy',
			status: 'Open',
			priority: 'High',
			lastUpdate: 'Jun 28, 2025',
		},
		{
			Id: '#45821',
			subject: 'Booking Failed after payment',
			status: 'Open',
			priority: 'High',
			lastUpdate: 'Jun 28, 2025',
		},
	]

	return (
		<div className='w-full px-[112px] pt-[60px] pb-[40px]'>
			<div className='mb-8'>
				<h4 className='font-semibold'>Raise a Ticket</h4>
				<p className='font-medium text-gray-400'>
					Have an issue or request? Submit and track your support
					tickets here. Our team is ready to help 24/7.
				</p>
			</div>
			<form className='w-full p-8 rounded-2xl shadow-2xl'>
				<p className='mb-8'>Raise a Ticket</p>
				<div className='flex items-center w-full gap-[45px]'>
					<div className='w-full'>
						<label className='mb-4'>Subject</label>
						<input
							type='input'
							placeholder='Eg. Issue with flight ticket'
							className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
						/>
					</div>
					<div className='w-full'>
						<label className='mb-4'>Category</label>
						<input
							type='input'
							placeholder='Eg. Refund raise'
							className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
						/>
					</div>
				</div>
				<div className='mt-[45px]'>
					<label className='mb-4'>Description</label>
					<textarea
						rows={4}
						type='input'
						placeholder='Write your message'
						className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
					/>
				</div>

				<div className='flex items-center justify-between mt-8'>
					<span className='flex items-center gap-4'>
						<button className='bg-[#F05A28] px-8 h-[36px] text-white text-sm font-medium rounded flex items-center justify-center gap-2'>
							<Upload />
							Upload Attach file
						</button>
						<select className='px-8 h-[36px] text-sm font-medium rounded flex items-center justify-center gap-2 border'>
							<option value=''>High Priority</option>
							<option value=''>Medium Priority</option>
							<option value=''>Low Priority</option>
						</select>
					</span>
					<button className='bg-[#F05A28] w-[145px] h-[36px] text-white text-sm font-medium rounded flex items-center justify-center gap-2'>
						Submit Ticket
					</button>
				</div>
			</form>
			<div className='p-8 shadow-2xl mt-8 rounded-2xl'>
				<p className=' font-medium'>Raised Tickets</p>
				{/* Table */}
				<table className='table table-fixed w-full mt-6 text-left '>
					<thead className='border-b-2 border-gray-200'>
						<tr>
							<th className='py-5'>Ticket ID</th>
							<th>Subject</th>
							<th>Status</th>

							<th>Priority</th>
							<th>Last Update</th>
						</tr>
					</thead>
					<tbody className='overflow-y-hidden h-[80%]'>
						{TicketData.map((invoice, index) => (
							<tr key={index} className=''>
								<td className='py-5'>{invoice.Id}</td>
								<td>{invoice.subject}</td>
								<td>{invoice.status}</td>
								<td>{invoice.priority}</td>
								<td>{invoice.lastUpdate}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default SupportTicket
