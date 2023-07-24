/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { FormEvent, useEffect, useState } from "react";
import Button from "./button";
import { CommentService } from "@/lib";
import { addMessage, clearMessageCategory } from "@/store/features/message/messageSlice";
import { errorToString } from "@/store/reject-helper";

type Status = 'idle' | 'working' | 'error' | 'abort' | 'submitted';
const MESSAGE_CATEGORY = 'comment';


interface ProductCommentFormProps {
  productId: string;
}

function ProductCommentForm({productId}: ProductCommentFormProps) {
  const [ init, setInit ] = useState(false);
  const [ status, setStatus ] = useState<Status>('idle');
  const [ error, setError ] = useState<string[] | null>(null);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearMessageCategory(MESSAGE_CATEGORY));
    setError(null);

    const data = {
      name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement)?.value,
      email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value,
      title: (e.currentTarget.elements.namedItem('title') as HTMLInputElement)?.value,
      stars: parseInt((e.currentTarget.elements.namedItem('stars') as HTMLInputElement)?.value),
      comment: (e.currentTarget.elements.namedItem('comment') as HTMLInputElement)?.value,
      productId
    };

    console.log("debug: SUBMIT", data);

    setStatus('working');
    const service = new CommentService();

    try {
      const validation = await service.validate(data);
      if (!validation.ok) {
        console.warn("Not Validated", validation.errors);
        setStatus('error');
        dispatch(addMessage({ category: MESSAGE_CATEGORY, type: 'error', title: 'Check your input', text: 'Missing and/or invalid input'}));
        setError(validation.errors);
      } else {
        const result = await service.submit(data);
        console.log("Comments sent", result);
        setStatus('submitted');
        dispatch(addMessage({ category: MESSAGE_CATEGORY, type: 'success', title: 'Success', text: 'Comment saved'}));
      }

    } catch (error) {
      console.warn('ERROR sending comment', error);
      setStatus('abort');
      dispatch(addMessage({ category: MESSAGE_CATEGORY, type: 'error', title: 'Problem saving comment', text: errorToString(error)}));
      setError(['Unable to process comment.']);
    } 
    
  }

  useEffect(() => {
    if (!init) {
      dispatch(clearMessageCategory(MESSAGE_CATEGORY));
      setInit(true);
      if (!productId) {
        setStatus('abort');
        setError(['Sorry, commenting service is not available at this moment']);
      }
    }
  }, [])


  return (
    <>
    {status === 'submitted' && (
      <>
      <h3 className="text-2xl font-normal text-fuchsia-600">Thank You</h3>
      <p>
        Your feedback is important and we appreciate you taking the time to write your comments here.
        It will take a few days for your comment to appear here.
      </p>
      </>
    )}
    {status === 'abort' && (
      <>
      <h3 className="text-2xl font-normal text-rose-600">Oops...</h3>
      <p>
        Your feedback is important and we appreciate you taking the time to write your comments here.
        It will take a few days for your comment to appear here.
      </p>
      </>
    )}
    {status !== 'submitted' && status !== 'abort' && (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h3 className="text-2xl font-light text-fuchsia-600">About You</h3>
      <div className="my-4">
        <label htmlFor="name" className="block font-semibold text-slate-400">
          Your Name<span className="text-fuchsia-200">*</span>
        </label>
        <input type="text" required name="name" 
          readOnly={isAuthenticated && !!user?.name} defaultValue={isAuthenticated ? user?.name : ''}
          className="block w-full text-lg py-1 px-2 rounded border-2 border-slate-600" />
      </div>        
      <div className="my-4">
        <label htmlFor="email" className="block font-semibold text-slate-400">
          Your Email<span className="text-fuchsia-200">*</span>
        </label>
        <input type="text" required name="email" 
          readOnly={isAuthenticated && !!user?.email} defaultValue={isAuthenticated ? user?.email : ''}
          className="block w-full text-lg py-1 px-2 rounded border-2 border-slate-600" />
      </div> 

      <h3 className="text-2xl font-light text-fuchsia-600 mt-8">Your Comments</h3>
      <div>
        <label htmlFor="title" className="block font-semibold text-slate-400">
          Title<span className="text-fuchsia-200">*</span>
        </label>
        <input type="text" required name="title" 
          maxLength={50}
          className="block w-full text-lg py-1 px-2 rounded border-2 border-slate-600" />
      </div>
      <div>
        <label htmlFor="stars" className="block font-semibold text-slate-400">
          Stars<span className="text-fuchsia-200">*</span>
        </label>
        <select required name="stars" className="block w-full text-lg py-1 px-2 rounded border-2 border-slate-600">
          <option>(your rating...)</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
      <div>
        <label htmlFor="comment" className="block font-semibold text-slate-400">
          Comment<span className="text-fuchsia-200">*</span>
        </label>
        <textarea required name="comment" rows={10} 
          className="block w-full text-lg py-1 px-2 rounded border-2 border-slate-600"></textarea>
      </div>

      {Array.isArray(error) && error.map((e, i) => (
        <div key={`error-${i}`} className="text-rose-600 my-2">{e}</div>
      ))}

      <div className="my-4 flex items-center">
        <Button submit={true} disabled={status === 'working'}>Save</Button>
        {status === 'working' && (
          <span className="mx-4">saving...</span>
        )}
      </div>

    </form>
    )}
    </>
  )
}

export default ProductCommentForm;