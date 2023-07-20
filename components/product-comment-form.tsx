"use client";

import { useAppSelector } from "@/store";
import { FormEvent, useState } from "react";
import Button from "./button";

type Status = 'idle' | 'working' | 'error' | 'submitted';

function ProductCommentForm() {
  const [ status, setStatus ] = useState<Status>('idle');
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement)?.value,
      email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value,
      title: (e.currentTarget.elements.namedItem('title') as HTMLInputElement)?.value,
      stars: parseInt((e.currentTarget.elements.namedItem('stars') as HTMLInputElement)?.value),
      comment: (e.currentTarget.elements.namedItem('comment') as HTMLInputElement)?.value,
    };

    console.log("debug: SUBMIT", data);
    setStatus('working');
    setTimeout(() => {
      setStatus('submitted');
    }, 2000);
  }


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
    {status !== 'submitted' && (
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