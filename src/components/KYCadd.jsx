import React from 'react'

const KYCadd = ({ setisAddKYC }) => {
	const handleSubmit = e => {
		e.preventDefault()
		localStorage.setItem('isAddKYC', true)
		setisAddKYC(true)
	}

	return (
		<div className='px-4 h-screen w-full'>
			<div className='h-full flex justify-center items-center font-jakarta font-medium'>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-4 shadow-2xl p-14 rounded-[30px]'>
					<h4 className='font-jakarta font-semibold text-[24px]'>
						Bank Details
					</h4>
					<div className='h-[5px] bg-[#EE5128] w-full max-w-[200px]' />
					<div className=''>
						<label className='font-bold'>Bank Name</label>
						<input
							type='input'
							placeholder='Enter Account Name'
							className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
						/>
					</div>
					<div className=''>
						<label className='font-bold'>Account Number</label>
						<input
							type='number'
							placeholder='Enter Account Number'
							className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
						/>
					</div>
					<div className=''>
						<label className='font-bold'>
							Confirm Account Number
						</label>
						<input
							type='number'
							placeholder='Re-enter Account Number'
							className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
						/>
					</div>
					<div className=''>
						<label className='font-bold'>Bank Code</label>
						<input
							type='number'
							placeholder='ex: xxxxxx'
							className='px-[20px] py-[14px] w-full outline-[#EE5128] bg-[#F1F3F6] rounded-[8px]'
						/>
					</div>

					<label className='w-[400px] flex gap-2 text-sm text-gray-300'>
						<input
							type='checkbox'
							className='h-6 w-6 accent-[#EE5128]'
						/>
						I've reviewed my bank details and confirm they are
						correct to the best of my knowledge.
					</label>

					<button
						type='Submit'
						className='font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white mt-[20px] drop-shadow-xl drop-shadow-[#FD74014D]'>
						Submit
					</button>
				</form>
			</div>
		</div>
	)
}

export default KYCadd
