import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useDropzone } from 'react-dropzone'
import { FileIcon, UploadIcon, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import Image from 'next/image'

type Props = {
  style?: unknown
  fileUrl?: string
  onChange: (url: string, type?: string, name?: string) => void
  onRemove?: (url: string) => void
  acceptFileOnly?: boolean
  allowFiles?: { [mimeType: string]: string[] }
  description?: string
}

const FileUpload: React.FC<Props> = (props) => {
  const {
    onChange,
    fileUrl = '',
    onRemove = () => ({}),
    acceptFileOnly = false,
    allowFiles,
    description
  } = props
  const [imgUrl, setFileUrl] = useState<string>(fileUrl)
  const [fileName, setFileName] = useState<string>('')
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)

  const onDrop = useCallback(async (acceptedFiles: File[] | null) => {
    if (acceptedFiles) {
      handleUploadFile(acceptedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const acceptImages = {
    'image/png': ['.png'],
    'image/jpg': ['.jpg'],
    'image/jpeg': ['.jpeg'],
  }
  const acceptPdf = {
    'application/pdf': ['.pdf'],
  }
  const allowedFiles = acceptFileOnly ? acceptPdf : { ...acceptImages, ...acceptPdf }

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    validator: (file) => {
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isLt20M) {
        return {
          code: 'name-too-large',
          message: 'NImage must smaller than 20MB!',
        }
      }
      return null
    },
    maxFiles: 1,
    accept: allowFiles || allowedFiles,
    maxSize: 20 * 1024 * 1024,
  })

  const handleUploadFile = async (file: File[]) => {
    const formData = new FormData()
    formData.append('file', file[0])
    // upload file to api

    console.log({file});
    
  }
  const currentFile = useMemo(() => {
    return acceptedFiles && acceptedFiles[0]
  }, [acceptedFiles])

  useEffect(() => {
    if (fileUrl) {
      setFileUrl(fileUrl)
      setFileName(fileUrl.includes('_') ? fileUrl.split('_')[1] : fileUrl.slice(-20))
    }
  }, [fileUrl])

  return (
    <>
      {!imgUrl ? (
        <div className="flex items-center gap-y-2 justify-center flex-col mb-5 flex-1 h-fit rounded-lg border-dotted border-2 border-[#C2CAE6] py-8">
          <div {...getRootProps()} className="flex items-center gap-y-2 flex-col p-2">
            <UploadIcon />
            <h2>Click to upload or Drag and drop file here</h2>
            
            <p className="text-[#676C5A] text-center">
              {description || `Files supported: PDF ${!acceptFileOnly && ', PNG'}. Maximum file size: 20MB`}
            </p>
            <input {...getInputProps()} />
          </div>
        </div>
      ) : (
        <div className="flex items-center px-4 justify-between mb-5 flex-1 h-[100px] bg-[var(--home-button-bg-color)] rounded-lg border-dotted border-2 border-[#B9D48C]">
          <ul className="flex items-center space-x-2">
            {imgUrl.includes('pdf') ? (
              <FileIcon />
            ) : (
              <span
                className=" cursor-pointer"
                onClick={() => {
                  setIsPreviewOpen(true)
                }}
              >
                <Image
                  className="border-[#B9D48C] border-dashed border"
                  priority
                  src={imgUrl}
                  width="50"
                  height="50"
                  alt={fileName}
                />
              </span>
            )}

            {currentFile ? (
              <li>
                <h3>
                  <a className=" underline" href={imgUrl} target="blank">
                    {currentFile.name}
                  </a>
                </h3>
                <p className="text-[#676C5A] text-xs">
                  {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </li>
            ) : (
              <li>
                <h3>
                  <a className="underline" href={imgUrl} target="blank">
                    {fileName}
                  </a>
                </h3>
                <p className="text-[#676C5A] text-xs"></p>
              </li>
            )}
          </ul>
          <ul
            className=" cursor-pointer"
            onClick={() => {
              onRemove(imgUrl)
              setFileUrl('')
              onChange('')
            }}
          >
            {/* {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UploadClose></UploadClose>
            )} */}
          </ul>
        </div>
      )}
      <Dialog open={isPreviewOpen}>
        <DialogContent className="">
          <DialogHeader className=" flex items-center text-center">
            <span
              onClick={() => {
                setIsPreviewOpen(false)
              }}
              className="cursor-pointer absolute right-[-10%] top-0 "
            >
              <X />
            </span>
          </DialogHeader>
          {/* <Document file={{ url: imgUrl }}></Document> */}
          <Image priority src={imgUrl} width="800" height="600" alt={fileName}></Image>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FileUpload
