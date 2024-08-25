'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ReactStories from 'react-insta-stories'
import { useDebounce } from 'react-use'

import { StoryWithNestedFields } from '@/@types/prisma'
import { Container } from '@/shared/components/shared'
import { Skeleton } from '@/shared/components/ui'
import { handleApiCall } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-clients'


interface Props {
  className?: string
}

export const Stories = ({ className }: Props) => {
  const [stories, setStories] = useState<StoryWithNestedFields[]>([])
  const [open, setOpen] = useState(false)
  const [currentStory, setCurrentStory] = useState<StoryWithNestedFields>()

  const currentItems = currentStory?.items.map(story => ({
    url: story.imageUrl,
  }))

  useDebounce(
    () =>
      handleApiCall(async () => {
        const { data } = await Api.stories.getAll()
        setStories(data)
      }),
    0,
    []
  )

  const onClickStory = (story: StoryWithNestedFields) => {
    setCurrentStory(story)
    setOpen(true)
  }

  return (
    <Container
      className={cn(className, 'flex items-center justify-between gap-2 my-10')}
    >
      {stories.length === 0
        ? [...Array(6)].map((_, index) => (
            <Skeleton key={index} className='w-[200px] h-[250px]' />
          ))
        : stories.map(story => (
            <div
              key={story.id}
              onClick={() => onClickStory(story)}
              className='cursor-pointer rounded-md w-[200px] h-[250px] overflow-hidden'
            >
              <Image
                src={story.previewImageUrl}
                alt={'story'}
                width={200}
                height={250}
                className='object-cover w-full h-full'
              />
            </div>
          ))}
      {open && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/80  flex items-center justify-center z-40'>
          <div className='relative w-[450px]'>
            <button
              className='absolute -right-10  z-50'
              onClick={() => setOpen(false)}
            >
              <X size={24} className='absolute top-0 right-0 text-white/50' />
            </button>

            <ReactStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={currentItems || []}
              defaultInterval={3000}
              width={450}
              height={700}
              storyInnerContainerStyles={{
                justifyContent: 'center',
              }}
            />
          </div>
        </div>
      )}
    </Container>
  )
}
