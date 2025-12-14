import { NextRequest, NextResponse } from 'next/server';
import pb from '../pb_client';

export async function GET() {
  try {
    // 獲取所有已登記禮物的清單
    const participants = await pb.collection('participants').getFullList({
      fields: 'id,code,initial_gift_name,is_revealed',
      filter: 'initial_gift_name != null && initial_gift_name != ""',
      sort: 'code'
    });

    const gifts = participants.map(participant => ({
      code: participant.code,
      giftName: participant.initial_gift_name,
      isRevealed: participant.is_revealed
    }));

    return NextResponse.json({
      success: true,
      gifts: gifts
    });

  } catch (error) {
    console.error('Gifts error:', error);
    return NextResponse.json(
      { error: '獲取禮物清單失敗' },
      { status: 500 }
    );
  }
}
