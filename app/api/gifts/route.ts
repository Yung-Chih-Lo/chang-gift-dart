import { NextRequest, NextResponse } from 'next/server';
import pb from '../pb_client';

export async function GET(request: NextRequest) {
  try {
    // 從查詢參數獲取投票者序號
    const searchParams = request.nextUrl.searchParams;
    const voterCode = searchParams.get('voterCode');

    if (!voterCode) {
      return NextResponse.json(
        { error: '需要提供投票者序號才能查看禮物清單' },
        { status: 400 }
      );
    }

    // 驗證投票者序號是否存在
    const voter = await pb.collection('participants').getFirstListItem(`code="${voterCode}"`, {
      fields: 'id,code'
    }).catch(() => null);

    if (!voter) {
      return NextResponse.json(
        { error: '投票者序號不存在' },
        { status: 404 }
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
