"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Coins, Trophy, History, ArrowLeft, Loader2, Target, Zap } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function RewardsPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState({ coins: 0, history: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchCoins();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const fetchCoins = async () => {
    try {
      const res = await axios.get("/api/user/coins");
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Login to see Rewards</h2>
          <p className="text-slate-500 mb-8">
            Create an account or login to track your coins and earn rewards from mock interviews.
          </p>
          <Link
            href="/login"
            className="block w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 hover:bg-slate-200 rounded-full transition">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900">Your Rewards</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-12 mb-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-indigo-100 font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                Total Orion Coins
              </p>
              <h2 className="text-6xl font-black">{data.coins.toLocaleString()}</h2>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex gap-6 text-center">
              <div>
                <p className="text-xs text-indigo-100 uppercase font-bold mb-1 tracking-wider">Level</p>
                <p className="text-xl font-extrabold flex justify-center items-center gap-1">
                  <Target className="w-4 h-4 text-green-400" /> 
                  {Math.floor(data.coins / 500) + 1}
                </p>
              </div>
              <div>
                <p className="text-xs text-indigo-100 uppercase font-bold mb-1 tracking-wider">Rank</p>
                <p className="text-xl font-extrabold flex justify-center items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  {data.coins >= 2000 ? "Gold" : data.coins >= 500 ? "Silver" : "Bronze"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Earn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-500" />
              How to Earn Coins
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li className="flex justify-between border-b pb-2">
                <span>Complete an AI Mock Interview</span>
                <span className="text-green-600 font-bold">+100 Coins</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Complete an AI Topic Test</span>
                <span className="text-green-600 font-bold">+50 Coins</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Bonus per Correct Test Answer</span>
                <span className="text-green-600 font-bold">+5 Coins</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-3">
               <Trophy className="w-8 h-8 text-yellow-500" />
             </div>
             <h3 className="text-lg font-bold text-slate-800 mb-2">More Features Coming Soon</h3>
             <p className="text-sm text-slate-500">
               Soon you will be able to redeem your coins for premium interview slots, advanced PDF analyses, and exclusive profile badges!
             </p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-lg shadow-slate-100 p-6 sm:p-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            Coin History
          </h2>

          {data.history.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <Coins className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No coins earned yet. Take a test or interview to start earning!</p>
              <Link href="/test" className="inline-block mt-4 text-indigo-600 font-bold hover:underline">
                Go to AI Tests →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {data.history.map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{tx.reason}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {tx.source} • {new Date(tx.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-black text-green-600">
                    +{tx.amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
