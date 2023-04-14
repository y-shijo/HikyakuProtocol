import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'

const CopyToClipboard = ({ text }: { text: string }) => {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
      console.log('Text copied to clipboard:', text) // Optional message for testing
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <InputGroup size="lg">
      <Input value={text} disabled />
      <InputRightElement width="4.5rem">
        <Button aria-label="Copy to clipboard" onClick={handleClick}>
          Copy
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default CopyToClipboard
