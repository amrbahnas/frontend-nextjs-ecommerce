"use client";

import Container from "@/components/ui/container";
import { Card, Skeleton } from "antd";

const ProfileSkeleton = () => {
  return (
    <Container>
      <div className="my-6">
        <Skeleton.Input
          style={{ width: 200, height: 32 }}
          active
          size="large"
        />
        <div className="mt-2">
          <Skeleton.Input style={{ width: 300 }} active />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Section */}
        <Card className="lg:col-span-2 shadow-sm">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center mb-8">
              <Skeleton.Avatar active size={100} />
              <div className="mt-4">
                <Skeleton.Input style={{ width: 150 }} active />
              </div>
              <div className="mt-2">
                <Skeleton.Input style={{ width: 200 }} active />
              </div>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <Skeleton.Input
                    style={{ width: 100 }}
                    active
                    className="mb-2"
                  />
                  <Skeleton.Input
                    style={{ width: "100%" }}
                    active
                    size="large"
                  />
                </div>
              ))}
              <Skeleton.Button active block size="large" />
            </div>
          </div>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Orders Section */}
          <Card
            title={
              <div className="flex items-center justify-between">
                <Skeleton.Input style={{ width: 100 }} active />
                <Skeleton.Button active size="small" />
              </div>
            }
            className="shadow-sm"
          >
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 p-3 rounded-lg"
                >
                  <Skeleton.Avatar active shape="square" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Skeleton.Input
                        style={{ width: 60 }}
                        active
                        size="small"
                      />
                      <Skeleton.Input
                        style={{ width: 80 }}
                        active
                        size="small"
                      />
                    </div>
                    <div className="mt-1">
                      <Skeleton.Input
                        style={{ width: 70 }}
                        active
                        size="small"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Addresses Section */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <Skeleton.Input style={{ width: 150 }} active />
              </div>
            }
            className="shadow-sm"
          >
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <Skeleton.Input
                    style={{ width: "60%" }}
                    active
                    className="mr-4"
                  />
                  <div className="flex gap-2">
                    <Skeleton.Button active size="small" />
                    <Skeleton.Button active size="small" />
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4">
                <Skeleton.Input style={{ width: 120 }} active />
                <Skeleton.Button active />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default ProfileSkeleton;
