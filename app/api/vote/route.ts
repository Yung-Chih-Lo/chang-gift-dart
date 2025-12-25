import { NextRequest, NextResponse } from 'next/server';
import pb from '../pb_client';

export async function POST(request: NextRequest) {
  try {
    const { voterCode, targetGiftName, password } = await request.json();

    if (!voterCode || !targetGiftName) {
      return NextResponse.json(
        { error: '投票者和目標禮物名稱都是必填的' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: '需要提供管理員密碼才能進行投票' },
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

    // 檢查投票者序號是否存在
    const voter = await pb.collection('participants').getFirstListItem(`code="${voterCode}"`, {
      fields: 'id,code'
    }).catch(() => null);

    if (!voter) {
      return NextResponse.json(
        { error: '投票者序號不存在' },
        { status: 404 }
      );
    }

    // 檢查是否已經投過票
    const existingVote = await pb.collection('votes').getFirstListItem(`voter_code="${voterCode}"`, {
      fields: 'id'
    }).catch(() => null);

    if (existingVote) {
      return NextResponse.json(
        { error: '您已經投過票了' },
        { status: 400 }
      );
    }

    // 檢查目標禮物是否存在
    const targetGift = await pb.collection('participants').getFirstListItem(`initial_gift_name="${targetGiftName}"`, {
      fields: 'id,initial_gift_name'
    }).catch(() => null);

    if (!targetGift) {
      return NextResponse.json(
        { error: '目標禮物不存在' },
        { status: 404 }
      );
    }

    // 創建投票記錄
    const newVote = await pb.collection('votes').create({
      voter_code: voterCode,
      voted_gift_name: targetGiftName
    });

    return NextResponse.json({
      success: true,
      message: '投票成功！',
      vote: {
        id: newVote.id,
        voterCode: newVote.voter_code,
        targetGiftName: newVote.voted_gift_name
      }
    });

  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { error: '投票失敗，請稍後再試' },
      { status: 500 }
    );
  }
}
