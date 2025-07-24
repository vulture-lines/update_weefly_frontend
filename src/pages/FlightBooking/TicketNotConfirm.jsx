import cancel from '/assets/ticketpage/cancel.png'
import AirIndiaLogo from '../../assets/images/AirIndiaLogo.svg'
import FlightLogo from '../../assets/images/FlightIcon.svg'
import { Link } from 'react-router'
function TicketNotConfirm() {
	return (
		<div className='py-[30px] px-10 xl:px-40'>
			<img
				src={cancel}
				alt={'Ticket Confirm Check Mark'}
				className='size-[60px] xl:size-[133px] mx-auto'
				data-aos='zoom-out'
			/>
			<p
				data-aos='fade-up'
				className='font-jakarta font-bold text-[24px] xl:text-[40px] text-center mt-[23px] xl:mt-[41px] uppercase'>
				Your Ticket has <br className='md:hidden' /> canceled
			</p>

			<div className='mt-[61px] ' data-aos='fade-up'>
				<h3 className='bg-[#FFE2DA] rounded-t-[17px] px-[45px] py-[17px] font-jakarta font-semibold text-[26px]'>
					Travelers Details
				</h3>
				<div className='font-jakarta px-[45px] bg-white'>
					<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6'>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>Name</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								John brevis
							</p>
						</div>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>Age</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								30
							</p>
						</div>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>
								Date of birth
							</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								19-05-1990
							</p>
						</div>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>
								Phone number
							</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								+91 89748 89371
							</p>
						</div>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>Seat no</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								PW90
							</p>
						</div>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>
								Booking ID
							</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								982948
							</p>
						</div>
					</div>
					<div className='h-px bg-black'></div>
					<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6'>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>Name</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								John brevis
							</p>
						</div>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>Age</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								30
							</p>
						</div>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>
								Date of birth
							</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								19-05-1990
							</p>
						</div>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>
								Phone number
							</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								+91 89748 89371
							</p>
						</div>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>Seat no</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								PW90
							</p>
						</div>
						<div className='py-[29px]'>
							<p className='text-base text-[#555555]'>
								Booking ID
							</p>
							<p className='font-medium text-[18px] mt-[13px]'>
								982948
							</p>
						</div>
					</div>
				</div>

				<div
					data-aos='fade-up'
					className='mt-[20px] bg-white rounded-[14px] py-[32px] px-[32px] lg:px-[44px] flex flex-col lg:flex-row items-center gap-10 lg:gap-5'>
					<div className=''>
						<img src={AirIndiaLogo} alt='air India logo' />
						<div className='flex items-center gap-[14px]'>
							<p className='font-sans font-normal text-[15px] text-neutral-500'>
								1244595
							</p>
							<p className='rounded-[5px] bg-[#008905] text-white font-sans text-base font-normal px-[13px] py-[4px]'>
								Business
							</p>
						</div>
					</div>
					<div className='flex-1 items-center w-full'>
						<div className='flex xl:px-[84px]'>
							{/* start time */}
							<div className='px-[20px] lg:px-[44px]'>
								<p className='text-[25px] xl:text-[38px] font-bold'>
									06:00
								</p>
								<p className='font-normal text-[13px] lg:text-[20px] text-neutral-500'>
									Algeries
								</p>
							</div>
							<div className='flex-1 py-[40px] relative '>
								<div className='relative border border-neutral-200 border-dashed h-px'>
									<div className='absolute bg-neutral-200 size-4 rounded-full -left-2 -top-2 border-2 border-white'></div>
									<div className='absolute bg-neutral-200 size-4 rounded-full -right-2 -top-2 border-2 border-white'></div>
								</div>
								<div className='flex flex-col items-center gap-[8px] absolute top-5 left-1/3'>
									<img
										src={FlightLogo}
										alt='Plane'
										className='h-[41px] w-[41px]'
									/>
									<p className='font-normal text-[17px] text-neutral-500'>
										16h 12m
									</p>
									{/* <p className="rounded-[5px] bg-[#008905] text-white font-sans text-base font-normal px-[13px] py-[4px]">
                    Refundable
                  </p> */}
								</div>
							</div>
							{/* End time */}
							<div className='px-[20px] xl:px-[44px]'>
								<p className='text-[25px] xl:text-[38px] font-bold'>
									19:00
								</p>
								<p className='font-normal text-[13px] xl:text-[20px] text-neutral-500'>
									Launda
								</p>
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-end lg:items-end text-center'>
						<p className='font-sans text-[25px] lg:text-[35px] font-black text-[#EE5128]'>
							$1,00,000{' '}
							<span className='text-base lg:text-[23px] font-normal text-black/70 font-sans'>
								/ pax
							</span>
						</p>
						<p className='font-sans text-base lg:text-[23px] text-black/70 line-through'>
							$1,50,000
						</p>
					</div>
				</div>
			</div>

			<div className=' max-w-[430px] w-full mx-auto mt-[70px] flex flex-col gap-[37px]'>
				<button
					data-aos='fade-up'
					className='font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white mt-[20px] drop-shadow-xl drop-shadow-[#FD74014D]'>
					Download invoice
				</button>
				<Link
					data-aos='fade-up'
					to={'/'}
					className='text-[#EE5128] font-jakarta font-semibold text-[18px] text-center mx-auto'>
					Back to home
				</Link>
			</div>
		</div>
	)
}

export default TicketNotConfirm
