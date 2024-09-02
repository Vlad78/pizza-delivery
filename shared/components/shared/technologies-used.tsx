import { CalendarIcon, CircleAlert } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from '../ui'

interface Props {
  className?: string
}

export const TechnologiesUsed = ({ className }: Props) => {
  return (
    <div className={cn(className, '')}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant='link'>
            <CircleAlert />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className='w-80' align='end'>
          <div className='flex justify-between space-x-4'>
            <div className='space-y-1'>
              <h4 className='text-sm font-semibold'>
                Technologies in this project
              </h4>
              <p className='text-sm'>
                <ul className='list-disc pl-5 space-y-1'>
                  <li>Next.js/app</li>
                  <li>Typescript</li>
                  <li>Lucide Icons</li>
                  <li>Shadcn / Radix UI</li>
                  <li>Server actions</li>
                  <li>Prisma</li>
                  <li>NextAuth</li>
                  <li>Stripe</li>
                  <li>Mailjet/Resend</li>
                  <li>Zustand</li>
                  <li>Zod</li>
                  <li>React Hook Form</li>
                  <li>Tailwind CSS</li>
                  <li>Axios</li>
                </ul>
              </p>
              <div className='flex items-center pt-2'>
                <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
                <span className='text-xs text-muted-foreground'>
                  02.09.2024
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
