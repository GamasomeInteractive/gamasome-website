'use client'
import { useTina } from 'tinacms/dist/react'
import { normalizeTinaImages } from '@/lib/normalizeTinaImages'
import SiteNav from './SiteNav'

type Props = {
  headerData: any
  headerQuery: string
  headerVars: object
}

export default function TinaHeader({ headerData, headerQuery, headerVars }: Props) {
  const { data: rawData } = useTina({ data: headerData, query: headerQuery, variables: headerVars })
  const data = normalizeTinaImages(rawData)

  return <SiteNav hdr={data.header} />
}
