import { NextRequest, NextResponse } from 'next/server';
import pb from '../pb_client';

export async function POST(request: NextRequest) {
  try {
    // 獲取所有已登記但未揭露的禮物
    const allParticipants = await pb.collection('participants').getFullList({
      fields: 'id,code,initial_gift_name,is_revealed',
      filter: 'initial_gift_name != null && initial_gift_name != "" && is_revealed = false'
    });

    if (allParticipants.length === 0) {
      return NextResponse.json(
        { error: '目前沒有已登記的禮物' },
        { status: 400 }
      );
    }

    // 隨機選擇一個禮物
    const randomIndex = Math.floor(Math.random() * allParticipants.length);
    const selectedGift = allParticipants[randomIndex];

    // 將該禮物標記為已揭露
    await pb.collection('participants').update(selectedGift.id, {
      is_revealed: true
    });

    return NextResponse.json({
      success: true,
      giftName: selectedGift.initial_gift_name,
      message: `你揭露了一個禮物：${selectedGift.initial_gift_name}`
    });

  } catch (error) {
    console.error('Reveal error:', error);
    return NextResponse.json(
      { error: '揭露失敗，請稍後再試' },
      { status: 500 }
    );
  }
}
