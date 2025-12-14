import { NextRequest, NextResponse } from 'next/server';
import pb from '../pb_client';

export async function POST(request: NextRequest) {
  try {
    const { code, giftName } = await request.json();

    if (!code || !giftName) {
      return NextResponse.json(
        { error: '序號和禮物名稱都是必填的' },
        { status: 400 }
      );
    }

    // 檢查序號是否存在（預先創建的）
    const existingParticipant = await pb.collection('participants').getFirstListItem(`code="${code}"`, {
      fields: 'id,code,initial_gift_name,is_revealed'
    }).catch(() => null);

    if (!existingParticipant) {
      return NextResponse.json(
        { error: '此序號不存在，請確認您的序號是否正確' },
        { status: 404 }
      );
    }

    // 檢查是否已經登記過禮物
    if (existingParticipant.initial_gift_name) {
      return NextResponse.json(
        { error: '此序號已經登記過禮物了' },
        { status: 400 }
      );
    }

    // 更新參與者記錄，添加禮物名稱
    const updatedParticipant = await pb.collection('participants').update(existingParticipant.id, {
      initial_gift_name: giftName,
      is_revealed: false
    });

    return NextResponse.json({
      success: true,
      message: '禮物登記成功！',
      participant: {
        id: updatedParticipant.id,
        code: updatedParticipant.code,
        initial_gift_name: updatedParticipant.initial_gift_name
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: '登記失敗，請稍後再試' },
      { status: 500 }
    );
  }
}
