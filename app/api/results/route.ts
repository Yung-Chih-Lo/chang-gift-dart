import { NextRequest, NextResponse } from 'next/server';
import pb from '../pb_client';

export async function GET() {
  try {
    // 獲取所有已登記的禮物
    const allGifts = await pb.collection('participants').getFullList({
      fields: 'id,code,initial_gift_name',
      filter: 'initial_gift_name != null && initial_gift_name != ""',
      sort: 'code'
    });

    // 獲取所有投票記錄
    const votes = await pb.collection('votes').getFullList({
      fields: 'id,voter_code,voted_gift_name'
    });

    // 統計每件禮物的得票數
    const voteCounts: { [key: string]: number } = {};
    votes.forEach(vote => {
      const giftName = vote.voted_gift_name;
      voteCounts[giftName] = (voteCounts[giftName] || 0) + 1;
    });

    // 為所有禮物建立結果（包括0票的）
    const results = allGifts.map(gift => ({
      giftName: gift.initial_gift_name,
      votes: voteCounts[gift.initial_gift_name] || 0
    })).sort((a, b) => b.votes - a.votes);

    // 獲取總投票數
    const totalVotes = votes.length;

    return NextResponse.json({
      success: true,
      results: results,
      totalVotes: totalVotes,
      winner: results.length > 0 ? results[0] : null
    });

  } catch (error) {
    console.error('Results error:', error);
    return NextResponse.json(
      { error: '獲取投票結果失敗' },
      { status: 500 }
    );
  }
}
