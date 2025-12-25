import { NextRequest, NextResponse } from 'next/server';
import pb from '../pb_client';

export async function GET(request: NextRequest) {
  try {
    // 從查詢參數獲取管理員密碼
    const searchParams = request.nextUrl.searchParams;
    const password = searchParams.get('password');

    if (!password) {
      return NextResponse.json(
        { error: '需要提供管理員密碼才能查看禮物清單' },
        { status: 400 }
      );
    }

    // 驗證管理員密碼
    const correctPassword = process.env.PASSWORD;

    if (!correctPassword) {
      console.error('PASSWORD environment variable is not set');
      return NextResponse.json(
        { error: '伺服器配置錯誤' },
        { status: 500 }
      );
    }

    if (password !== correctPassword) {
      return NextResponse.json(
        { error: '管理員密碼錯誤' },
        { status: 401 }
      );
    }

    // 驗證通過後，獲取所有已登記禮物的清單
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
