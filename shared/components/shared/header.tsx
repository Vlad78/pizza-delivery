import Image from 'next/image'
import Link from 'next/link'

import { CartButton, Container, ProfileButton, SearchInput } from '@/shared/components/shared'
import { cn } from '@/shared/lib/'


interface Props {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Header = ({
	className,
	hasSearch = true,
	hasCart = true,
}: Props) => {
	return (
		<header className={cn('border-b', className)}>
			<Container className='flex items-center justify-between py-4 gap-16'>
				{/* Left side */}
				<Link href={'/'} className='flex items-center gap-4'>
					<Image src={'/logo.svg'} alt='pizza logo' width={85} height={85} />

					<div>
						<h1 className='text-2xl uppercase font-black'>Next pizza</h1>
						<p className='text-sm text-gray-400 leading-3'>
							Best pizza on the east
						</p>
					</div>
				</Link>
				{/* Search */}

				{hasSearch && (
					<div className='flex-1 min-w-[250px]'>
						<SearchInput />
					</div>
				)}

				{/* Right side */}

				<div className='flex items-center gap-3'>
					<ProfileButton />

					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	)
}
