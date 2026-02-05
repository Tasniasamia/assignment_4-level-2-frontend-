'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { Review } from '@/types';
import { addReview } from '@/actions/review.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';



export default function ReviewSection({userId,mealId,orderId}:{userId:string,mealId:string,orderId:string}) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const {push}=useRouter();

  const handleSubmit = async() => {
    const toatId = toast.loading("Adding Review");
    try {
    if (rating === 0) return; // require at least 1 star
    const newReview: Review = {
      orderId:orderId,
      userId: userId,
      mealId:mealId,
      rating:rating,
      comment:comment,
    };
    const { data, error } = await addReview(newReview);
    console.log('data component',data);
    console.log("error component",error)
      if (data?.success) {
        toast.success(data.message || "Add review successfully",{ id: toatId });
        
        return;
      }
      console.log('error',error);
      console.log('review',data)
      toast.error(
        error?.error?.message || error?.message || 'Failed to Review',{ id: toatId }
      );
      return;
    }
    catch(error:any){
        toast.error(error?.message, { id: toatId });

    }
  };

  return (
    <div className="space-y-6">
      {/* ===== Review Form ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Leave a Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <Label>Your Rating:</Label>
            <Rating value={rating} onValueChange={setRating} />
          </div>

          {/* Comment */}
          <div className="flex flex-col space-y-3">
            <Label htmlFor="comment"className='mb-3'>Comment</Label>
            <Textarea
              id="comment"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit */}
          <Button className='cursor-pointer' onClick={handleSubmit}>Submit Review</Button>
        </CardContent>
      </Card>

      {/* ===== Reviews List ===== */}
      <div className="space-y-4">
  

        {reviews.map((rev,index) => (
          <Card key={index}>
            <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Rating:</span>
                <Rating value={rev.rating} readOnly />
              </div>
              <p className="text-sm text-muted-foreground">{rev.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
