'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useDropzone } from 'react-dropzone'
import { FileIcon, Loader2, UploadIcon, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import Image from 'next/image'
import { getFilePreview, uploadFile } from '@/actions/uploadFile'
import { useToast } from '@/hooks/use-toast'

type Props = {
  style?: unknown
  fileId?: string
  onChange: (url: string, type?: string, name?: string) => void
  onRemove?: (url: string) => void
  acceptFileOnly?: boolean
  allowFiles?: { [mimeType: string]: string[] }
  description?: string
}

const FileUpload: React.FC<Props> = (props) => {
  const {
    onChange,
    fileId = '',
    onRemove = () => ({}),
    acceptFileOnly = false,
    allowFiles,
    description
  } = props
  const [imgUrl, setFileUrl] = useState<string>(fileId)
  const [fileName, setFileName] = useState<string>('')
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()

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
      const isLt5M = file.size / 1024 / 1024 <= 5
      if (!isLt5M) {
        return {
          code: 'file-too-large',
          message: 'File must be smaller than 5MB!',
        }
      }
      return null
    },
    maxFiles: 1,
    accept: allowFiles || allowedFiles,
    maxSize: 5 * 1024 * 1024,
  })

  const handleUploadFile = async (file: File[]) => {
    if (file && file?.length) {
      const inputFile = file[0]
      if (inputFile?.size > 5 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          description: 'File must be smaller than 5MB!',
        })
        return
      }

      setLoading(true)
      const formData = new FormData()
      formData.append('file', inputFile)
      await uploadFile(formData).then((value) => {
        onChange(value.$id)
        setFileName(value.name)
      }).catch((err) => {
        console.log("file upload err: ", err);
        toast({
          variant: 'destructive',
          description: 'Failed to upload. Try again later'
        })
      }).finally(() => setLoading(false))
    } else {
      toast({
        variant: 'destructive',
        description: 'Failed to upload. Ensure file is less than 5MB!',
      })
    }
  };

  const currentFile = useMemo(() => {
    return acceptedFiles && acceptedFiles[0]
  }, [acceptedFiles])

  const getFileUrl = async (fileId: string) => {
    setLoading(true)
    await getFilePreview(fileId).then((value) => {
      setFileUrl(value)
    }).catch((err) => {
      console.log("getFileUrl err: ", err);
    }).finally(() => setLoading(false))
  };

  useEffect(() => {
    if (fileId) {
      getFileUrl(fileId) // 672f1416003a6488534d
    }
  }, [fileId])

  return (
    <>
      {!imgUrl ? (
        <div className="flex items-center gap-y-2 justify-center flex-col mb-5 flex-1 h-fit rounded-lg border-dotted border-2 border-dark-500 py-8 cursor-pointer">
          <div {...getRootProps()} className="flex items-center gap-y-2 flex-col p-2 text-dark-600">
            <Image
              src='/assets/icons/upload.svg'
              height={44}
              width={44}
              alt={'icon'}
              className={`${loading && 'animate-bounce'}`}
            />
            <h2> <span className='text-primary'>Click to upload </span>or Drag and drop</h2>
            
            <p className="text-dark-600 text-center text-sm">
              {description || `Files supported: PDF ${!acceptFileOnly && ', PNG'}. Maximum file size: 20MB`}
            </p>
            <input {...getInputProps()} />
          </div>
        </div>
      ) : (
        <div className="flex items-center px-4 justify-between mb-5 flex-1 h-[100px] bg-[var(--home-button-bg-color)] rounded-lg border-dotted border-2 border-primary">
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
                  className="border-primary border rounded-md border-dotted"
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
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <X />
            )}
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
